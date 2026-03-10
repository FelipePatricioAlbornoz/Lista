import react from 'react';

function App() {
  return (
    <div>
      <h1>
        Para listar suas tarefas, preciso que faza seu cadastro:
      </h1>

      <form>
        <label>
          nome:
          <input
          type="text"
          name="nome"
          placeholder="Crie seu nome"
          />
        </label>
      </form>

        <form>
        <label>
          senha:
          <input
          type="password"
          name="senha"
          placeholder="Crie sua senha"
          />
        </label>
      </form>
    </div>
    
  )
}

export default App;