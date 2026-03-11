const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  port: 5433,
  password: "senai",
  database: "sistema",
});

module.exports = pool;
