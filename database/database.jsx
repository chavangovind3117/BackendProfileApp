const mysql = require('mysql2/promise');
require('dotenv').config();

// Create a MySQL connection pool
// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
// });
const pool = mysql.createPool({
    host: process.env.DB_HOST,        // MySQL host (e.g., 'localhost' or 'db.example.com')
    user: process.env.DB_USER,        // MySQL username
    password: process.env.DB_PASS, // MySQL password
    database: process.env.DB_NAME,    // MySQL database name
    port: process.env.DB_PORT || 3306 // MySQL port (default is 3306)
});
// const pool = mysql.createPool(process.env.DB_URL);

// Testing the database connection
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Connected to MySQL Database!');
        connection.release(); // Release the connection back to the pool
    } catch (error) {
        console.error('Error connecting to MySQL Database:', error.message);
    }
})();

module.exports = pool;
