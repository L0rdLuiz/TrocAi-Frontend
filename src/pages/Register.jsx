import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Cadastro.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        navigate("/"); // Navega para a página de login após o sucesso
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div class="card">
      <h1>Cadastrar</h1>
      <form onSubmit={handleSubmit}>
        <p>
          Nome
          <input 
            type="text" 
            id="inNome" 
            name="nome" 
            required 
            onChange={(e) => setName(e.target.value)} 
          />
        </p>
        <p>
          E-mail
          <input 
            type="email" 
            id="inemail" 
            name="email" 
            required 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </p>
        <p>
          Senha
          <input 
            type="password" 
            id="insenha" 
            name="senha" 
            required 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </p>
        {/* Removido o <h3 id="resp"> pois o React gerencia a resposta */}<p></p>
        <button type="submit">Cadastrar</button>
        <Link to="/">
          <button type="button">Login</button>
        </Link>
      </form>
    </div>
  );
}

export default Register;