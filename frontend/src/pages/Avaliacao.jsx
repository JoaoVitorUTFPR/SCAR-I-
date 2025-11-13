import styles from "./Avaliacao.module.css";
import Sidebar from "../components/Sidebar";
import { createUsuarioSimulado, finalizarSimulado, getAvaliacaoAtual } from "../services/simuladoService";
import { useEffect, useState } from "react";
import Questao from "../components/Questao";
import { useNavigate, useParams } from "react-router-dom";

function Avaliacao() {
  const { simuladoId } = useParams();
  const navigate = useNavigate();
  const [usuarioSimuladoId, setUsuarioSimuladoId] = useState(null);
  const [simulado, setSimulado] = useState(null);
  const [respostas, setRespostas] = useState([]);

const carregarSimulado = () => {
    if(simuladoId) {

      createUsuarioSimulado(simuladoId).then((retorno) => {
        setSimulado(retorno.simulado);
        setRespostas(retorno.resposta || []);
        setUsuarioSimuladoId(retorno.id);
      });

    }
    else {
      getAvaliacaoAtual().then((retorno) => {
        setSimulado(retorno.simulado);
        setRespostas(retorno.resposta || []);
        setUsuarioSimuladoId(retorno.id);
      });
    }
  };

  const efetivarFinalizarSimulado = () => {
    finalizarSimulado(usuarioSimuladoId).then(
      (dados) => {
          navigate("/download")
      }
    );
  }
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
          <button className={styles.finalizarBtn} onClick={efetivarFinalizarSimulado}>
            Finalizar Simulado
          </button>
        </div>
      </div>
    </div>
  );
}

export default Avaliacao;
