const pool = require('../configs/db');

async function getAll(req, res) {
  try {
    const resultado = await pool.query(
      'SELECT * FROM tasks WHERE user_id = $1 ORDER BY id',
      [req.user.id]
    );
    res.json(resultado.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function create(req, res) {
  const { titulo, descricao } = req.body;
  if (!titulo) return res.status(400).json({ error: 'titulo é obrigatório' });
  try {
    const resultado = await pool.query(
      "INSERT INTO tasks (titulo, descricao, user_id) VALUES ($1, $2, $3) RETURNING *",
      [titulo, descricao || null, req.user.id]
    );
    res.status(201).json(resultado.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function update(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const resultado = await pool.query(
      'UPDATE tasks SET status=$1 WHERE id=$2 AND user_id=$3 RETURNING *',
      [status, id, req.user.id]
    );
    if (resultado.rows.length === 0)
      return res.status(404).json({ error: 'Task não encontrada' });
    res.json(resultado.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getAll, create, update };