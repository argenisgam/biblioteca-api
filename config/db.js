const mysql = require("mysql2/promise");
require("dotenv").config();

// La antigua conexión PostgreSQL con pg.Pool queda sustituida por este pool MySQL.
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = pool;
