import { useEffect, useState } from "react";
import { getSimulado } from "../services/simuladoService";
import { Link } from "react-router-dom";
import styles from "./SimuladoList.module.css";
import { PiNotebook } from "react-icons/pi"; 

function SimuladoList() {
  const [simulados, setSimulados] = useState([]);

  const carregarSimulados = () => {
    getSimulado().then(setSimulados);
  };

  useEffect(() => {
    carregarSimulados();
  }, []);

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nº</th>
            <th>Instituição / Vestibular</th>
            <th>Nº de Questões</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {simulados.map((simulado, index) => (
            <tr className={styles.row} key={simulado.id}>
              <td>{index + 1}</td>
              <td>{simulado.nome}</td>
              <td>{simulado.questoes.length}</td>
              <td>
                <Link to={`/Avaliacao/${simulado.id}`} className={styles.iconButton}>
                  <PiNotebook />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SimuladoList;