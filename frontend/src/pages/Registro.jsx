export const Registro = () => {

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
    const efetivarRegistro = () => {
        
        const usuario = fazerRegistro(registroInfo);
        window.location.href = "/login";
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