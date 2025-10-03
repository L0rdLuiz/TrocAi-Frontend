import { Link } from "react-router-dom";
import "../styles/Cadastro.css";

function Register() {
  return (
    <div class="card">

    <h1>Cadastrar</h1>
    <form>
        <p>
            Nome
            <input type="text" id="inNome" name="nome" required />
        <h3 id="resp"></h3>
        </p>
        <p>
            Número
            <input type="number" id="innumero" name="numero" required />
        </p>
         <p>
             E-mail
            <input type="email" id="inemail" name="email" required />
        </p>
         <p>
            Senha
            <input type="password" id="insenha" name="senha" required />
         </p>

         <button
                 type="submit">Cadastrar

         </button>
            <button type="button" onclick="window.location.href='./login.html'">Login</button>
    </form>
</div>
  );
}

export default Register;
