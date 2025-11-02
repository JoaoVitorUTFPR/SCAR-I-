import { useState } from "react";


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
    
    const efetivarLogin = () => {
        const token = fazerLogin(loginInfo)
        if(token) {
            localStorage.setItem("token", token);
        }
    }

    return (
        <>
            <form onSubmit={efetivarLogin}>
                <h2>Login</h2>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" required onChange={setInfo}/>
                </div>
                <div>
                    <label>Senha:</label>
                    <input type="password" name="senha" required onChange={setInfo}/>
                </div>
                <button type="submit">Entrar</button>
            </form>
        </>
    )
}