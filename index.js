const express = require('express');
const cors = require('cors');
const nodemailer = require("nodemailer");
require('dotenv').config();

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const PORT = process.env.PORT || 5000;

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
        username: "pawans751983@gmail.com"
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
        'Jan, 2025': {
            Basic: 45000,
            HRA: 3000,
            MedicalAllowance: 5000,
            Conveyance: 600,
            TotalCTC: 53600,
        },
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
            Basic: 35000,
            HRA: 3000,
            MedicalAllowance: 4000,
            Conveyance: 600,
            TotalCTC: 42600,
        },
        'Mar, 2024': {
            Basic: 55000,
            HRA: 1000,
            MedicalAllowance: 4000,
            Conveyance: 600,
            TotalCTC: 90600,
        },
        'Jun, 2024': {
            Basic: 25000,
            HRA: 4000,
            MedicalAllowance: 4000,
            Conveyance: 600,
            TotalCTC: 33600,
        },
        'Jul, 2024': {
            Basic: 25000,
            HRA: 2000,
            MedicalAllowance: 5000,
            Conveyance: 600,
            TotalCTC: 32600,
        },
        'Aug, 2024': {
            Basic: 2000,
            HRA: 3000,
            MedicalAllowance: 4000,
            Conveyance: 600,
            TotalCTC: 26600,
        },
        'Sept, 2024': {
            Basic: 25000,
            HRA: 3000,
            MedicalAllowance: 4000,
            Conveyance: 600,
            TotalCTC: 32600,
        },
        'Nov, 2024': {
            Basic: 15000,
            HRA: 3000,
            MedicalAllowance: 4000,
            Conveyance: 600,
            TotalCTC: 42600,
        },
        'Dec, 2024': {
            Basic: 25000,
            HRA: 4000,
            MedicalAllowance: 4000,
            Conveyance: 600,
            TotalCTC: 33600,
        },
        'Jan, 2023': {
            Basic: 30000,
            HRA: 2500,
            MedicalAllowance: 6000,
            Conveyance: 800,
            TotalCTC: 39300
        },
        'Feb, 2023': {
            Basic: 2200,
            HRA: 3500,
            MedicalAllowance: 4500,
            Conveyance: 700,
            TotalCTC: 30900
        },
        'Apr, 2023': {
            Basic: 40000,
            HRA: 3500,
            MedicalAllowance: 5000,
            Conveyance: 1000,
            TotalCTC: 49500
        },
        'Mar, 2023': {
            Basic: 60000,
            HRA: 1500,
            MedicalAllowance: 4500,
            Conveyance: 700,
            TotalCTC: 101700
        },
        'Jun, 2023': {
            Basic: 30000,
            HRA: 4500,
            MedicalAllowance: 5000,
            Conveyance: 800,
            TotalCTC: 40300
        },
        'Jul, 2023': {
            Basic: 27000,
            HRA: 2200,
            MedicalAllowance: 5200,
            Conveyance: 700,
            TotalCTC: 35100
        },
        'Aug, 2023': {
            Basic: 2500,
            HRA: 3200,
            MedicalAllowance: 4800,
            Conveyance: 800,
            TotalCTC: 31800
        },
        'Sept, 2023': {
            Basic: 28000,
            HRA: 3500,
            MedicalAllowance: 4500,
            Conveyance: 900,
            TotalCTC: 36900
        },
        'Nov, 2023': {
            Basic: 18000,
            HRA: 3500,
            MedicalAllowance: 4500,
            Conveyance: 900,
            TotalCTC: 51900
        },
        'Dec, 2023': {
            Basic: 32000,
            HRA: 4500,
            MedicalAllowance: 5000,
            Conveyance: 900,
            TotalCTC: 42400
        },
        'Jan, 2022': {
            Basic: 32000,
            HRA: 2600,
            MedicalAllowance: 5500,
            Conveyance: 750,
            TotalCTC: 41250
        },
        'Feb, 2022': {
            Basic: 2400,
            HRA: 3600,
            MedicalAllowance: 4700,
            Conveyance: 650,
            TotalCTC: 31350
        },
        'Apr, 2022': {
            Basic: 38000,
            HRA: 3400,
            MedicalAllowance: 5200,
            Conveyance: 950,
            TotalCTC: 47550
        },
        'Mar, 2022': {
            Basic: 59000,
            HRA: 1700,
            MedicalAllowance: 4400,
            Conveyance: 850,
            TotalCTC: 105950
        },
        'Jun, 2022': {
            Basic: 29000,
            HRA: 4300,
            MedicalAllowance: 4900,
            Conveyance: 850,
            TotalCTC: 39050
        },
        'Jul, 2022': {
            Basic: 26000,
            HRA: 2100,
            MedicalAllowance: 5100,
            Conveyance: 750,
            TotalCTC: 34950
        },
        'Aug, 2022': {
            Basic: 2300,
            HRA: 3100,
            MedicalAllowance: 4600,
            Conveyance: 850,
            TotalCTC: 30850
        },
        'Sept, 2022': {
            Basic: 27000,
            HRA: 3300,
            MedicalAllowance: 4400,
            Conveyance: 950,
            TotalCTC: 35650
        },
        'Nov, 2022': {
            Basic: 17000,
            HRA: 3400,
            MedicalAllowance: 4300,
            Conveyance: 950,
            TotalCTC: 49550
        },
        'Dec, 2022': {
            Basic: 31000,
            HRA: 4400,
            MedicalAllowance: 4800,
            Conveyance: 950,
            TotalCTC: 41150
        }
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
        'Jan, 2023': {
            Basic: 30000,
            HRA: 2500,
            MedicalAllowance: 6000,
            Conveyance: 800,
            TotalCTC: 39300
        },
        'Feb, 2023': {
            Basic: 2200,
            HRA: 3500,
            MedicalAllowance: 4500,
            Conveyance: 700,
            TotalCTC: 30900
        },
        'Apr, 2023': {
            Basic: 40000,
            HRA: 3500,
            MedicalAllowance: 5000,
            Conveyance: 1000,
            TotalCTC: 49500
        },
        'Mar, 2023': {
            Basic: 60000,
            HRA: 1500,
            MedicalAllowance: 4500,
            Conveyance: 700,
            TotalCTC: 101700
        },
        'Jun, 2023': {
            Basic: 30000,
            HRA: 4500,
            MedicalAllowance: 5000,
            Conveyance: 800,
            TotalCTC: 40300
        },
        'Jul, 2023': {
            Basic: 27000,
            HRA: 2200,
            MedicalAllowance: 5200,
            Conveyance: 700,
            TotalCTC: 35100
        },
        'Aug, 2023': {
            Basic: 2500,
            HRA: 3200,
            MedicalAllowance: 4800,
            Conveyance: 800,
            TotalCTC: 31800
        },
        'Sept, 2023': {
            Basic: 28000,
            HRA: 3500,
            MedicalAllowance: 4500,
            Conveyance: 900,
            TotalCTC: 36900
        },
        'Nov, 2023': {
            Basic: 18000,
            HRA: 3500,
            MedicalAllowance: 4500,
            Conveyance: 900,
            TotalCTC: 51900
        },
        'Dec, 2023': {
            Basic: 32000,
            HRA: 4500,
            MedicalAllowance: 5000,
            Conveyance: 900,
            TotalCTC: 42400
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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
