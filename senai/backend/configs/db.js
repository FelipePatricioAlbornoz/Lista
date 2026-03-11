const { Pool } = require("pg");

const pool = new Pool({
  user: "felipe",
  host: "localhost",
  port: 5432,
  password: "1420",
  database: "sistema",
});

module.exports = pool;
