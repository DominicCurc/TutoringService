// // Importing express module
// const express = require('express');
// const path = require('path'); // Add this line to use path module

// const app = express();
// const PORT = 3000;

// // Middleware to serve static files from 'public' directory
// app.use(express.static('/'));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '/index.html'));
// });

// app.listen(PORT, (error) => {
//     if (!error)
//         console.log("Server is Successfully Running, "
//             + "and App is listening on port " + PORT)
//     else
//         console.log("Error occurred, server can't start", error);
// });

const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(express.json()); // for parsing application/json

// // Nodemailer transporter setup
// const transporter = nodemailer.createTransport({
//   service: 'gmail', // using gmail as the service
//   auth: {
//     user: process.env.EMAIL_USER, // your email address
//     pass: process.env.EMAIL_PASSWORD // your email password
//   }
// });

const transporter = nodemailer.createTransport({
  // host: "smtp.ethereal.email",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.GMAIL_USER, //this appears as undefined right now
    pass: process.env.GMAIL_PASS
  },
});
console.log(process.env.GMAIL_USER);

// POST route to send email
app.post('/send-email', (req, res) => {
  console.log("post works");
  const email = "curciodominic0@gmail.com"; // Or get this from req.body if it's dynamic
  const mailOptions = {
    from: "curciodominic0@gmail.com",
    to: email,
    subject: 'New Inquiry',
    text: 'Hello Dominic, I am interested in your class',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    
    // Insert email into the database
    const query = "INSERT INTO inquiries (email) VALUES (?)";
    // next step is to save user's email and name to the database
    db.query(query, [email], (err, result) => {
      if (err) {
        return res.status(500).send(err.toString());
      }
      res.status(200).send('Email sent and saved to database: ' + info.response);
    });
  });
});

// Your server needs to listen on some port (3000 in this case)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

