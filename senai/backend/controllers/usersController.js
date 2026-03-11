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

async function update(req, res) {
  const { id } = req.params;
  const { nome, email } = req.body;

  try {
    const resultado = await pool.query(
      "UPDATE users SET nome=$1, email=$2 WHERE id=$3 RETURNING id, nome, email, role",
      [nome, email, id],
    );

    if (resultado.rows.length === 0)
      return res.status(404).json({ error: "Usuario nao foi achado" });

    res.json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function create(req, res) {
  const { nome, email, senha } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users (nome, email, senha, role) VALUES ($1, $2, $3, 'user') RETURNING id, nome, email, role",
      [nome, email, senha],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getAll, getById, update, create };
