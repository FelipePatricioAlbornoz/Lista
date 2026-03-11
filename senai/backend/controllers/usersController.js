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

async function getById(req, res) {
  const { id } = req.params;
  try {
    const resultado = await pool.query(
      "SELECT id, nome, email, role FROM users WHERE id = $1",
      [id],
    );
    if (resultado.rows.length === 0)
      return res.status(404).json({ error: "Usuario nao achado" });
    res.json(resultado.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getAll, getById };
