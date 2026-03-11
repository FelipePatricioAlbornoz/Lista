const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const useRoutes = require("./routes/users");
const taskRoutes = require("./routes/tasks");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/users", useRoutes);
app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
