const mysql = require('mysql2/promise');
require('dotenv').config();

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

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
