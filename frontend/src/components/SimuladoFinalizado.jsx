import { useEffect, useState } from "react";
import { getNotaSimulado } from "../services/simuladoService";
import styles from "./SimuladoFinalizado.module.css";
import { Link } from "react-router-dom";

export default function SimuladoFinalizado({ usuarioSimuladoId }) {

  const [infoSimulado, setInfoSimulado] = useState(null);

  useEffect(() => {
    const fetchInfoSimulado = async (usuarioSimuladoId) => {
      getNotaSimulado(usuarioSimuladoId).then(setInfoSimulado);
    }
    fetchInfoSimulado(usuarioSimuladoId);
  }, [usuarioSimuladoId]);

  return (
    <div className={styles.container}>
      <div className={styles.tableWrapper}>
        <div className={styles.header}>
          <span className={styles.icon}>📄</span>
          <span className={styles.title}>
            {infoSimulado ? infoSimulado.nomeSimulado : "Carregando..."}
          </span>
        </div>

        <table className={styles.table}>
          <tbody>
            <tr>
              <td className={styles.cellLabel}>Situação</td>
              <td className={styles.cellValue}>Finalizado</td>
            </tr>
            <tr>
              <td className={styles.cellLabel}>Nota</td>
              <td className={styles.cellValue}>

                {infoSimulado ? <p><strong>{infoSimulado.nota}%</strong> de {infoSimulado.totalQuestoes} (<strong>100%</strong>)</p> : "Carregando..."}
              </td>
            </tr>
            <tr>
              <td className={styles.cellLabel}>Data de Finalização</td>
              <td className={styles.cellValue}>
                {infoSimulado ? infoSimulado.dataFim : "Carregando..."}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles.buttons}>
        <Link className={styles.button} to={'/relatorio/' + usuarioSimuladoId} target="_blank">
          📄 Download Relatório
        </Link>
      </div>
    </div>
  );
}
