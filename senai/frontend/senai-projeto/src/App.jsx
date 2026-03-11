import { useState } from 'react';
import axios from 'axios';

function App() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");

  const cadastrar = async (e) => {
    e.preventDefault();
    if (nome.trim() === "" || senha.trim() === "" || email.trim() === "") {
      alert('Preencha todos os campos');
      return;
    }
    try {
      await axios.post('http://localhost:3000/users', { nome, email, senha });
      alert('Cadastro realizado!');
    } catch (err) {
      alert(err.response?.data?.error || 'Erro ao cadastrar');
    }
  };

  return (
      <div>
        <h1>Para listar suas tarefas, preciso que faça seu cadastro:</h1>

        <form onSubmit={cadastrar}>
          <label>
            nome:
            <input
              type="text"
              placeholder="Crie seu nome"
              onChange={(e) => setNome(e.target.value)}
            />
          </label>

          <h5>E também a sua senha</h5>

          <label>
            senha:
            <input
              type="password"
              placeholder="Crie sua senha"
              onChange={(e) => setSenha(e.target.value)}
            />
          </label>

                    <h5>E também a sua senha</h5>

          <label>
            email:
            <input
              type="text"
              placeholder="Digita um email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br/>
          {nome && senha && email && <button type="submit">cadastrar</button>}
        </form>
      </div>
    );
  }

  export default App;
