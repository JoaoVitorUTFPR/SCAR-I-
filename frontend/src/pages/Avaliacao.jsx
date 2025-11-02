import styles from "./Avaliacao.module.css";
import Sidebar from "../components/Sidebar";
import { createUsuarioSimulado, getSimuladoId } from "../services/simuladoService";
import { useEffect, useState } from "react";
import Questao from "../components/Questao";
import { useParams } from "react-router-dom";

function Avaliacao(){
    const {simuladoId} = useParams();
    const [usuarioSimuladoId, setUsuarioSimuladoId] = useState(null);
    const [simulado, setSimulado] = useState(null);
    const [respostas, setRespostas] = useState(null);

    const carregarSimulado = () => {
        createUsuarioSimulado("671b00000000000000000101", simuladoId).then(
            (retorno) => {
                setSimulado(retorno.simulado);
                setRespostas(retorno.resposta);
                setUsuarioSimuladoId(retorno.id);
            }
        );
    };

    useEffect(() => {
        carregarSimulado();
    }, []);

    return (
    <>
        <div className={styles.container}>
        <Sidebar />
        <div className={styles.content}>
            <p>{simulado?.nome}</p>
            <div>
                {simulado?.questoes?.map((questao, index) =>(
                    <div key = {index}>
                        {<Questao resposta = {respostas.find(r => r.questaoId === questao.id)} questao={questao} numero={index+1}/>}
                    </div>
                ))}
            </div>
        </div>
        </div>
    </>
    );
}

export default Avaliacao; 