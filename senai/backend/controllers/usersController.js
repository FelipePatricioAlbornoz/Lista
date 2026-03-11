const pool = require("../configs/db");

async function getAll(req, res) {
  try {
    const resultado = await pool.query(
      "SELECT id, nome, email, role FROM users ORDER BY id",
    );
    res.json(resultado.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getAll };
