import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Cadastro.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Login bem-sucedido!");
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userId", data.userId);
        navigate("/menu"); // Navega para a página de menu
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div class="card">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
        <Link to="/register">
          <button type="button">Cadastro</button>
        </Link>
      </form>
    </div>
  );
}

export default Login;