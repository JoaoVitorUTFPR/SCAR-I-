import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fazerLogin } from "../services/authService";
import styles from "./login.module.css";

export const Login = () => {
  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    senha: ''
  });

  const setInfo = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value
    });
  };

  const efetivarLogin = async (e) => {
    e.preventDefault();
    const token = await fazerLogin(loginInfo);
    if (token) {
      localStorage.setItem("token", token);
    
    }
  };

  const irParaRegistro = () => {
    navigate("/registro");
  };

  return (
    <main className={styles.container}>
      <form onSubmit={efetivarLogin}>
        <h1>Login</h1>

        <div className={styles["input-box"]}>
          <input type="email"name="email"placeholder="Usuário"requiredonChange={setInfo}/>
        </div>
        <div className={styles["input-box"]}>
          <input type="password"name="senha"placeholder="Senha"requiredonChange={setInfo}/></div>

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