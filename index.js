// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

//Middleware
app.use(bodyParser.json());
app.use(cors());

app.post('/submit-form', (req, res) => {
    const { name, email, phone, message } = req.body;

    //log the data to the console for now
    console.log('Form Submission:', { name, email, phone, message });

    //send a response to the client
    res.status(200).json({ message: 'Form submitted successfully!' });
});

//Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});