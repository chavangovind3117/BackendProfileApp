const express = require('express');
const cors = require('cors');
const nodemailer = require("nodemailer");
require('dotenv').config();

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

// Sample JSON data for users and salary details
const users = [
    {
        EmployeeID: "1002",
        password: "12345",
        EmployeeName: "John Doe",
        Designation: "Crop Inspector",
        username: "chavangovind798@gmail.com"

    },
    {
        EmployeeID: "1003",
        password: "54321",
        EmployeeName: "Jane Smith",
        Designation: "Software Engineer",
        username: "jane.smith@email.com"
    },
    {
        EmployeeID: "1004",
        password: "password1",
        EmployeeName: "Sam Johnson",
        Designation: "Project Manager",
        username: "sam.johnson@email.com"

    },
    {
        EmployeeID: "1005",
        password: "mypassword",
        EmployeeName: "Emily Davis",
        Designation: "Business Analyst",
        username: "emily.davis@email.com"
    },
    {
        EmployeeID: "1006",
        password: "securepass",
        EmployeeName: "Michael Brown",
        Designation: "Data Scientist",
        username: "michael.brown@email.com"

    }
];

const salaryData = {
    '1002': {
        'Jan, 2024': {
            Basic: 25000,
            HRA: 2000,
            MedicalAllowance: 5000,
            Conveyance: 600,
            TotalCTC: 32600,
        },
        'Feb, 2024': {
            Basic: 2000,
            HRA: 3000,
            MedicalAllowance: 4000,
            Conveyance: 600,
            TotalCTC: 26600,
        },
        'Apr, 2024': {
            Basic: 25000,
            HRA: 3000,
            MedicalAllowance: 4000,
            Conveyance: 600,
            TotalCTC: 32600,
        },
        'Mar, 2024': {
            Basic: 15000,
            HRA: 3000,
            MedicalAllowance: 4000,
            Conveyance: 600,
            TotalCTC: 42600,
        },
        'Jun, 2024': {
            Basic: 25000,
            HRA: 4000,
            MedicalAllowance: 4000,
            Conveyance: 600,
            TotalCTC: 33600,
        },
    },
    '1003': {
        'Jan, 2024': {
            Basic: 25000,
            HRA: 2000,
            MedicalAllowance: 5000,
            Conveyance: 600,
            TotalCTC: 32600,
        },
        'Feb, 2024': {
            Basic: 2000,
            HRA: 3000,
            MedicalAllowance: 4000,
            Conveyance: 600,
            TotalCTC: 26600,
        },
        'Apr, 2024': {
            Basic: 25000,
            HRA: 3000,
            MedicalAllowance: 4000,
            Conveyance: 600,
            TotalCTC: 32600,
        },
        'Mar, 2024': {
            Basic: 15000,
            HRA: 3000,
            MedicalAllowance: 4000,
            Conveyance: 600,
            TotalCTC: 42600,
        },
        'Jun, 2024': {
            Basic: 25000,
            HRA: 4000,
            MedicalAllowance: 4000,
            Conveyance: 600,
            TotalCTC: 33600,
        },
    },
    '1004': {
        'Jan, 2024': {
            Basic: 25000,
            HRA: 2000,
            MedicalAllowance: 5000,
            Conveyance: 600,
            TotalCTC: 32600,
        },
        'Feb, 2024': {
            Basic: 2000,
            HRA: 3000,
            MedicalAllowance: 4000,
            Conveyance: 600,
            TotalCTC: 26600,
        },
        'Apr, 2024': {
            Basic: 25000,
            HRA: 3000,
            MedicalAllowance: 4000,
            Conveyance: 600,
            TotalCTC: 32600,
        },
        'Mar, 2024': {
            Basic: 15000,
            HRA: 3000,
            MedicalAllowance: 4000,
            Conveyance: 600,
            TotalCTC: 42600,
        },
        'Jun, 2024': {
            Basic: 25000,
            HRA: 4000,
            MedicalAllowance: 4000,
            Conveyance: 600,
            TotalCTC: 33600,
        },
    },
    '1005': {
        'Jan, 2024': {
            Basic: 25000,
            HRA: 2000,
            MedicalAllowance: 5000,
            Conveyance: 600,
            TotalCTC: 32600,
        },
        'Feb, 2024': {
            Basic: 2000,
            HRA: 3000,
            MedicalAllowance: 4000,
            Conveyance: 600,
            TotalCTC: 26600,
        },
        'Apr, 2024': {
            Basic: 25000,
            HRA: 3000,
            MedicalAllowance: 4000,
            Conveyance: 600,
            TotalCTC: 32600,
        },
        'Mar, 2024': {
            Basic: 15000,
            HRA: 3000,
            MedicalAllowance: 4000,
            Conveyance: 600,
            TotalCTC: 42600,
        },
        'Jun, 2024': {
            Basic: 25000,
            HRA: 4000,
            MedicalAllowance: 4000,
            Conveyance: 600,
            TotalCTC: 33600,
        },
    },
    '1006': {
        'Jan, 2024': {
            Basic: 25000,
            HRA: 2000,
            MedicalAllowance: 5000,
            Conveyance: 600,
            TotalCTC: 32600,
        },
        'Feb, 2024': {
            Basic: 2000,
            HRA: 3000,
            MedicalAllowance: 4000,
            Conveyance: 600,
            TotalCTC: 26600,
        },
        'Apr, 2024': {
            Basic: 25000,
            HRA: 3000,
            MedicalAllowance: 4000,
            Conveyance: 600,
            TotalCTC: 32600,
        },
        'Mar, 2024': {
            Basic: 15000,
            HRA: 3000,
            MedicalAllowance: 4000,
            Conveyance: 600,
            TotalCTC: 42600,
        },
        'Jun, 2024': {
            Basic: 25000,
            HRA: 4000,
            MedicalAllowance: 4000,
            Conveyance: 600,
            TotalCTC: 33600,
        },
    },
};

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
app.post('/forget-password', (req, res) => {
    const { username } = req.body;
    const user = users.find((u) => u.username === username);
    if (user) {
        const otp = generateOTP();
        otpStore[username] = otp;
        sendOTPEmail(username, otp);
        // Send OTP to user's email 
        res.json({ success: true, message: 'OTP sent to your email.' });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// OTP verification endpoint 
app.post('/verify-otp', (req, res) => {
    const { username, otp } = req.body;
    const user = users.find((u) => u.username === username);

    if (otpStore[username] === otp && user) {

        delete otpStore[username]; // Clear OTP after verification 

        // Exclude the password field before sending the response
        const { password, ...userWithoutPassword } = user;
        res.json({
            success: true,
            userWithoutPassword,
            message: 'OTP verified successfully.'
        });
    } else {
        res.json({ success: false, message: 'Invalid OTP.' });
    }
});


// ******-- Profile endpoint --******

app.post('/profile', (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
        // Exclude the password field before sending the response
        const { password, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
    } else {
        res.status(404).json({ error: 'Enter valid Username and Password' });
    }
});

// *****-- Salary details endpoint --******

app.get('/fetch-salary', (req, res) => {
    const { employeeID, month, year } = req.query;
    console.log(employeeID, month, year);
    const monthYear = `${month}, ${year}`;
    const salary = salaryData[employeeID]?.[monthYear];

    if (salary) {
        res.json(salary);
    } else {
        res.status(404).json({ error: 'Salary details not found' });
    }
});

// **-- Start the server --**

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// ******-- Login endpoint --******

// app.post('/login', (req, res) => {
//     const { username, password } = req.body;
//     const user = users.find((u) => u.username === username && u.password === password);

//     if (user) {
//         res.json({ success: true });
//     } else {
//         res.json({ success: false });
//     }
// });