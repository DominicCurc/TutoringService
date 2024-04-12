const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3000;

// I don't think that these are correct/accurate 
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '1234', 
    database: 'emailCollector'
});

// Connect to MySQL
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database!');
});

// Middleware to parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle form submission
app.post('/submit-email', (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).send('Email is required');
    }

    const sql = 'INSERT INTO emails (email) VALUES (?)';
    connection.query(sql, [email], (error, results) => {
        if (error) {
            return res.status(500).send('Error saving email');
        }
        res.send('Email successfully saved! and here is the results: \n\n' + results);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

