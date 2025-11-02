import { useEffect, useState } from "react";
import { getSimulado } from "../services/simuladoService";
import { Link } from "react-router-dom";

function SimuladoList() {
    const [simulados, setSimulados] = useState([]);

    const carregarSimulados = () => {
        getSimulado().then(setSimulados);
    };

    useEffect(() => {
        carregarSimulados();
    }, []);

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <td>Nº</td>
                        <td>Instituição/Vestibular</td>
                        <td>Nº de Questões</td>
                    </tr>
                </thead>
                <tbody>
                    {simulados.map((simulado, index) => {
                        return (
                            <tr key={simulado.id}>
                                <td>{index+1}</td>
                                <td>{simulado.nome}</td>
                                <td>{simulado.questoes.length}</td>
                                <td><Link to ={`/Avaliacao/${simulado.id}`}>Fazer simulado</Link></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    );
}

export default SimuladoList;