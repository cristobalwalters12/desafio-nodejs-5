require("dotenv").config();

const DB_SETTINGS = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  allowExitOnIdle: true,
};

const PORT = process.env.PORT || 5000;

console.log(process.env.PORT);

module.exports = { DB_SETTINGS, PORT };
