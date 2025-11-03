import { useState } from "react";
import { fazerLogin } from "../services/authService";
import styles from "./login.module.css";

export const Login = () => {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        senha: ''
    });

    const setInfo = (e) => {
        setLoginInfo({
            ...loginInfo,
            [e.target.name]: e.target.value
        });
    }

    const efetivarLogin = async () => {
        const token = await fazerLogin(loginInfo)
        if (token) {
            localStorage.setItem("token", token);
        }
    }

    return (
        <main className={styles.container}>
            <form onSubmit={efetivarLogin}>
                <h1>Login</h1>
                <div className={styles["input-box"]}>
                    <input type="email" name="email" placeholder="Usuário" required onChange={setInfo}/>
                </div>
                <div className={styles["input-box"]}>
                    <input type="password" name="senha"  placeholder="Senha" required onChange={setInfo}/>
                </div>
                <button type="submit">Login</button>
            </form>
        </main>
    );
};
