// Importing express module
const express = require('express');
const path = require('path'); // Add this line to use path module

const app = express();
const PORT = 3000;

// Middleware to serve static files from 'public' directory
app.use(express.static('/'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, "
            + "and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
});
