import { useState, useEffect } from 'react';
import axios from 'axios';

function TaskList({ token, user }) {
  const [tasks, setTasks] = useState([]);
  const [titulo, setTitulo] = useState("");

  const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: { Authorization: `Bearer ${token}` }
  });

  const buscarTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      alert('Erro ao buscar tasks');
    }
  };

  const criarTask = async (e) => {
    e.preventDefault();
    if (!titulo.trim()) return;
    try {
      await api.post('/tasks', { titulo });
      setTitulo("");
      buscarTasks();
    } catch (err) {
      alert(err.response?.data?.error || 'Erro ao criar task');
    }
  };

  const concluirTask = async (id) => {
    try {
      await api.put(`/tasks/${id}`, { status: 'feito' });
      buscarTasks();
    } catch (err) {
      alert('Erro ao atualizar task');
    }
  };

  useEffect(() => { buscarTasks(); }, []);

  return (
    <div>
      <h1>Olá, {user.nome}!</h1>
      <form onSubmit={criarTask}>
        <input
          type="text"
          placeholder="Nova tarefa"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <strong>{task.titulo}</strong> — {task.status}
            {task.status !== 'feito' && (
              <button onClick={() => concluirTask(task.id)}>Concluir</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;