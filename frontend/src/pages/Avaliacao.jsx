import styles from "./Avaliacao.module.css";
import Sidebar from "../components/Sidebar";
import { createUsuarioSimulado, finalizarSimulado } from "../services/simuladoService";
import { useEffect, useState } from "react";
import Questao from "../components/Questao";
import { useParams } from "react-router-dom";

function Avaliacao() {
  const { simuladoId } = useParams();
  const [usuarioSimuladoId, setUsuarioSimuladoId] = useState(null);
  const [simulado, setSimulado] = useState(null);
  const [respostas, setRespostas] = useState([]);

  const carregarSimulado = () => {
    createUsuarioSimulado(simuladoId).then((retorno) => {
      setSimulado(retorno.simulado);
      setRespostas(retorno.resposta || []);
      setUsuarioSimuladoId(retorno.id);
    });
  };

  useEffect(() => {
    carregarSimulado();
  }, []);

  if (!simulado) {
    return (
      <div className={styles.loadingContainer}>
        <Sidebar />
        <div className={styles.content}>
          <p >Carregando simulado...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <h2 className={styles.title}>{simulado.nome}</h2>
        <div className={styles.questoesContainer}>
          {simulado.questoes?.map((questao, index) => (
            <Questao
              key={questao.id}
              resposta={respostas.find((r) => r.questaoId === questao.id)}
              questao={questao}
              numero={index + 1}
              usuarioSimuladoId={usuarioSimuladoId}
            />
          ))}
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.finalizarBtn} onClick={() => finalizarSimulado(usuarioSimuladoId)}>
            Finalizar Simulado
          </button>
        </div>
      </div>
    </div>
  );
}

export default Avaliacao;
