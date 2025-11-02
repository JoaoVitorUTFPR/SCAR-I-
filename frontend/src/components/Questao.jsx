import Sidebar from "./Sidebar";
import { getSimuladoId, updateALternativa } from "../services/simuladoService";
import { useState } from "react";

function Questao({questao, numero, resposta, usuarioSimuladoId}){
    const [respostaAtual, setRespostaAtual] = useState(resposta); 
    const handleChange = (e) =>{
        const alternativaescolhida = e.target.value;
        setRespostaAtual({questaoId: questao.id, alternativaId: alternativaescolhida});
        updateALternativa({questaoId: questao.id, alternativaId: alternativaescolhida, usuarioSimuladoId})
    }
    return (
    <>
        <div>
            Questão {numero}
        </div>
        <div>
            {questao?.corpo}
        </div>
        <div>
            {questao?.alternativa?.map((alt, index) =>(
                <>
                    <form>
                        <input checked = {alt.id === respostaAtual.alternativaId} onClick = {handleChange} type="radio" id={`questao${numero}_alt${index}`} name={`questao${numero}`} value={alt.id}/>
                        <label htmlFor={`questao${numero}_alt${index}`}>{alt.corpo}</label>
                    </form>
                </>
            ))}
        </div>
    </>
    );
}

export default Questao;