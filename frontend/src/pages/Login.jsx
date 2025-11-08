import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fazerLogin } from "../services/authService";
import styles from "./Login.module.css";

export const Login = () => {
  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    senha: ''
  });

  const setInfo = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.id]: e.target.value
    });
  };

  
    const efetivarLogin = async (e) => {
        e.preventDefault();
        const data = await fazerLogin(loginInfo)
        if (data && data.token) {
            localStorage.setItem("token", data.token);
            navigate("/")
        }
        else {
            alert("Erro ao fazer login.")
        }
    }
  const irParaRegistro = () => {
    navigate("/registrar");
  };

  return (
    <main className={styles.container}>
      <form onSubmit={efetivarLogin}>
        <h1>Login</h1>

        <div className={styles["input-box"]}>
          <input type="email" id="email" placeholder="Usuário" required onChange={setInfo}/>
        </div>
        <div className={styles["input-box"]}>
          <input type="password" id="senha" placeholder="Senha" required onChange={setInfo}/></div>

        <button type="submit">Login</button>

        <p className={styles["register-link"]}>
          Não possui conta?{" "}
          <span onClick={irParaRegistro} className={styles["link-button"]}>
            Registrar-se
          </span>
        </p>
      </form>
    </main>
  );
};