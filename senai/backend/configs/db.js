const { Pool } = require('pool');

const pool = new Pool({
    user: 'felipe',
    host: 'localhost',
    port: 5432,
    password: 1420,
    dabatase: 'tarefas_db'
});

module.exports = pool;