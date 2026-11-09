require("dotenv").config();

// PostgreSQL anterior: dialect "postgres", puerto 5432 y SSL de Neon.
// Sequelize CLI ahora toma las credenciales MySQL del archivo .env.
const mysqlConfig = {
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "biblioteca",
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 3306),
  dialect: "mysql"
};

module.exports = {
  development: mysqlConfig,
  test: { ...mysqlConfig, database: process.env.DB_TEST_DATABASE || "biblioteca_test" },
  production: mysqlConfig
};
