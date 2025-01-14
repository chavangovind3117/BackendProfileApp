const express = require('express');
const cors = require('cors');
const nodemailer = require("nodemailer");
require('dotenv').config();
const mysql = require('mysql2/promise');
const pool = require('./database/database.jsx');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const PORT = process.env.PORT || 5000;

// OTP Storage (in-memory) 
const otpStore = {};
// Nodemailer transport setup 
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Generate OTP 
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP via email 
const sendOTPEmail = (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending OTP email:', error);
        } else {
            console.log('OTP email sent:', info.response);
        }
    });
};

// Forget Password endpoint 
app.post('/forget-password', async (req, res) => {
    const { username } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length > 0) {
            const otp = generateOTP();
            otpStore[username] = otp;
            sendOTPEmail(username, otp);
            res.json({ success: true, message: 'OTP sent to your email.' });
        } else {
            res.status(404).json({ success: false, message: 'User not found.' });
        }
    } catch (error) {
        console.error('Error in forget-password:', error.message);
        res.status(500).json({ success: false, message: 'An error occurred.' });
    }
});

// OTP verification endpoint 
app.post('/verify-otp', async (req, res) => {
    const { username, otp } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length > 0 && otpStore[username] === otp) {
            delete otpStore[username]; // Clear OTP after verification
            const user = rows[0];
            const { password, ...userWithoutPassword } = user; // Exclude password
            res.json({
                success: true,
                user: userWithoutPassword,
                message: 'OTP verified successfully.',
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Invalid OTP.'
            });
        }
    } catch (error) {
        console.error('Error in verify-otp:', error.message);
        res.status(500).json({ success: false, message: 'An error occurred.' });
    }
});


// ******-- Profile endpoint --******

app.post('/profile', async (req, res) => {
    const { username, password } = req.body;
    // const user = users.find((u) => u.username === username && u.password === password);
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password]);

    if (rows.length > 0) {
        const user = rows[0];
        // Exclude the password field before sending the response
        const { password, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
    } else {
        res.status(404).json({ error: 'Enter valid Username and Password' });
    }
});

// *****-- Salary details endpoint --******

app.get('/fetch-salary', async (req, res) => {
    const { employeeID, month, year } = req.query;
    console.log(employeeID, month, year);
    const monthYear = `${month}, ${year}`;
    try {
        const [rows] = await pool.query(
            'SELECT * FROM salarydata WHERE EmployeeID = ? AND monthYear=?',
            [employeeID, monthYear]
        );
        const salaryDetails = rows[0];
        if (rows.length > 0) {
            res.json(salaryDetails);
        } else {
            res.status(404).json({ success: false, message: 'Salary details not found.' });
        }
    } catch (error) {
        console.error('Error in fetch-salary:', error.message);
        res.status(500).json({ success: false, message: 'An error occurred.' });
    }
});

// **-- Start the server --**

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
