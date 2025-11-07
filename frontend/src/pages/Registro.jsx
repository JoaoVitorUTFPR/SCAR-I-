import { useState } from "react";
import { fazerRegistro } from "../services/authService";
import { useNavigate } from "react-router-dom";
import styles from "./Registro.module.css";

export const Registro = () => {
  const navigate = useNavigate();

  const [registroInfo, setRegistroInfo] = useState({
    nome: "",
    email: "",
    senha: ""
  });

  const setInfo = (e) => {
    setRegistroInfo({
      ...registroInfo,
      [e.target.name]: e.target.value
    });
  };

  const efetivarRegistro = async (e) => {
    e.preventDefault();
    const usuario = await fazerRegistro(registroInfo);
    if (usuario) {
      navigate("/login");
    }
  };

  return (
    <main className={styles.container}>
      <form onSubmit={efetivarRegistro}>
        <h1>Registro</h1>
        
        <div className={styles["input-box"]}>
          <input
            type="text" name="nome" placeholder="Nome" required onChange={setInfo}/>
        </div>
        <div className={styles["input-box"]}>
          <input type="email" name="email"placeholder="Email" required onChange={setInfo}/>
        </div>
        <div className={styles["input-box"]}>
          <input type="password" name="senha" placeholder="Senha" required onChange={setInfo}/>
        </div>
        <button type="submit">Registrar</button>
      </form>
    </main>
  );
};