const { Pool } = require("pg");
const { DB_SETTINGS } = require("../config/config");

const pool = new Pool(DB_SETTINGS);

module.exports = { pool };
