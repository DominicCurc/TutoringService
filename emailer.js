// const nodeMailer = require('nodemailer')

// const html = '<h1>Hello, I am interested in Ancient Greek. You can respond to this </h1>';

// async function main() {
//     const transport = nodeMailer.createTransport({
//         host:'a',
//         port:465,
//         secure:true,
//         auth: {
//             user: process.env.GMAIL_USER,
//             pass:process.env.GMAIL_USER
//         }
//     });

//     const info = await transport.sendMail({

//     });

//     console.log("Message sent: "+ info.messageId);
// }

// main()

const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(bodyParser.json());

console.log("\tasdf\n\n");

const transporter = nodemailer.createTransport({
  service: 'gmail', // Example using Gmail; configure as needed for your service
  auth: {
    user: process.env.GMAILUSER,
    pass: process.env.GMAILPASS // For Gmail, it's safer to use OAuth2 or an App Password
  }
});
console.log(process.env.GMAILUSER);

app.post('/send-email', (req, res) => {
  // const { email, message } = req.body;
  const mailOptions = {
    from: 'curciodominic0@gmail.com',
    to: 'curciodominic0@gmail.com',
    subject: 'Interest in Your Class',
    text: 'message'
  };
  console.log(mailOptions);
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}/`);
// });
