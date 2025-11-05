import { useState } from "react";
import { fazerRegistro } from "../services/authService";
import { useNavigate } from "react-router-dom";


export const Registro = () => {

    const navigate = useNavigate();

    const [registroInfo, setRegistroInfo] = useState({
        email: '',
        senha: ''
    });

    const setInfo = (e) => {
        setRegistroInfo({
            ...registroInfo,
            [e.target.name]: e.target.value
        });
    }
    const efetivarRegistro = async () => {
        
        const usuario = await fazerRegistro(registroInfo);
        if(usuario){
            navigate("/login")
        }

    }

    return (
        <>
            <form onSubmit={efetivarRegistro}>
                <h2>Registro</h2>
                <div>
                    <label>Nome:</label>
                    <input type="nome" name="nome" required onChange={setInfo}/>
                </div>
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