// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
    require('dotenv').config()

const app = express();
const PORT = 3000;

//Middleware
app.use(bodyParser.json());
app.use(cors());

app.post('/submit-form', (req, res) => {
    const { name, email, phone, message } = req.body

    let betaData = {name, email, phone, message}

    //log the data to the console for now
    console.log('Form Submission:', { name, email, phone, message });

    //Nodemailer sends the content to email
    const transporter = nodemailer.createTransport({
        host: "mail.privateemail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    //async..await
    async function main() {
        //send email with defined transport object
        const info = await transporter.sendMail({
            from: ' "IT Support" <info@inthesun.xyz>', //sender email address
            to: "alilasteve@gmail.com", //list of receivers
            subject: "Contact Form Submission",
            html: "<p>Greetings! The website contact survey is well received "+ "<br>Name "+`${name}<hr>`+"<br>Email "+`${email}<hr>`+"<br>Phone "+`${phone}`+"<br>Message "+`${message}`+"<p>"
        });
        console.log("Message sent: %s", info.messageId);
    }
    main().catch(console.error);


    //send a response to the client
    res.status(200).json({ message: 'Form submitted successfully!' });
});

//Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});