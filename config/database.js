const { Sequelize } = require("sequelize");
require("dotenv").config();

// PostgreSQL anterior: dialect: "postgres", port: 5432 y SSL de Neon.
// Se conserva como referencia mientras la aplicación usa MySQL.
const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: process.env.DB_DIALECT,
        logging: false
    }
);

module.exports = sequelize;
