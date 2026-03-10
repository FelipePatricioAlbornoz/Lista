import { useState } from 'react';

function App() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  
  const formularioEspaco = () => {
    if (nome.trim() === "" || senha.trim() === "") {
    alert('SEM ESPAÇOS NA SENHA');
  } else {
    alert("gloria");
  }
};

  return (
    <div>
      <h1>Para listar suas tarefas, preciso que faça seu cadastro:</h1>

      <form onSubmit={formularioEspaco}>
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

        <br />
        {nome && senha && <button type="submit">cadastrar</button>}
      </form>
    </div>
  );
}

export default App;
