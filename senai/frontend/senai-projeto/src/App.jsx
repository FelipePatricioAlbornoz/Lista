import { useState } from 'react';
import axios from 'axios';
import TaskList from './TaskList';

function App() {
  const [tela, setTela] = useState("cadastro"); // "cadastro" ou "login"
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const cadastrar = async (e) => {
    e.preventDefault();
    if (!nome.trim() || !senha.trim() || !email.trim()) {
      alert('Preencha todos os campos');
      return;
    }
    try {
      await axios.post('http://localhost:3000/users', { nome, email, senha });
      const login = await axios.post('http://localhost:3000/auth/login', { email, senha });
      setToken(login.data.token);
      setUser(login.data.user);
    } catch (err) {
      alert(err.response?.data?.error || 'Erro ao cadastrar');
    }
  };

  const logar = async (e) => {
    e.preventDefault();
    if (!email.trim() || !senha.trim()) {
      alert('Preencha todos os campos');
      return;
    }
    try {
      const res = await axios.post('http://localhost:3000/auth/login', { email, senha });
      setToken(res.data.token);
      setUser(res.data.user);
    } catch (err) {
      alert(err.response?.data?.error || 'Credenciais inválidas');
    }
  };

  if (token) return <TaskList token={token} user={user} />;

  if (tela === "login") return (
    <div>
      <h1>Login</h1>
      <form onSubmit={logar}>
        <label>email: <input type="text" placeholder="Seu email" onChange={(e) => setEmail(e.target.value)} /></label>
        <br />
        <label>senha: <input type="password" placeholder="Sua senha" onChange={(e) => setSenha(e.target.value)} /></label>
        <br />
        <button type="submit">Entrar</button>
      </form>
      <p>Não tem conta? <button onClick={() => setTela("cadastro")}>Cadastrar</button></p>
    </div>
  );

  return (
    <div>
      <h1>Para listar suas tarefas, preciso que faça seu cadastro:</h1>
      <form onSubmit={cadastrar}>
        <label>nome: <input type="text" placeholder="Crie seu nome" onChange={(e) => setNome(e.target.value)} /></label>
        <br />
        <label>email: <input type="text" placeholder="Seu email" onChange={(e) => setEmail(e.target.value)} /></label>
        <br />
        <label>senha: <input type="password" placeholder="Crie sua senha" onChange={(e) => setSenha(e.target.value)} /></label>
        <br />
        {nome && senha && email && <button type="submit">Cadastrar</button>}
      </form>
      <p>Já tem conta? <button onClick={() => setTela("login")}>Fazer login</button></p>
    </div>
  );
}

export default App;