const express = require('express');
const cors = require('cors');
const useRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});