import React from "react";
import "../styles/Cadastro.css";

function Login() {
  return (
    <div class="card">

        <h1>Login</h1>
        <form>

            <p>
                E-mail
                <input type="email" id="inemail" name="email" required />

            </p>
            <p>
                Senha
                <input type="password" id="insenha" name="senha" required />
            </p>

            <button
                    type="submit">Login

            </button>
            <button type="button" onclick="window.location.href='./cadastro.html'"> Cadastro</button>
        </form>
    </div>
  );
}

export default Login;