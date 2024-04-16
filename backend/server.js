const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;



// Middleware to parse JSON and URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS for all origins
app.use(cors());

// Route to handle form submissions
app.post('/submit-form', async (req, res) => {
    const formData = req.body;
    console.log('Form Data Received:', formData);

    try {
        // Create a nodemailer transporter
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'ajaypanaskar8@gmail.com',
                pass: 'fpaelzajbaknrvxz',
            },
        });

        // Send email to the owner
        let ownerInfo = await transporter.sendMail({
            from: 'ajaypanaskar8@gmail.com',
            to: 'ajaypanaskar8@gmail.com', 
            subject: 'New Query from User',
            html: `<p>Hi,</p>
                   <p>You have received a new query from a user:</p>
                   <p>Name: ${formData.name}</p>
                   <p>Email: ${formData.email}</p>
                   <p>Subject: ${formData.subject}</p>
                   <p>Message: ${formData.message}</p>`,
        });

        // Send email to the user
        let userInfo = await transporter.sendMail({
            from: 'ajaypanaskar8@gmail.com',
            to: formData.email,
            subject: 'Thank You for Your Query',
            html: `<p>Hi ${formData.name},</p>
                   <p>Thank you for submitting your query. We will get back to you soon.</p>`,
        });

        console.log('Owner email sent: %s', ownerInfo.messageId);
        console.log('User email sent: %s', userInfo.messageId);

        res.status(200).send('Form submitted successfully');
    } catch (error) {
        console.error('Error sending emails:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
