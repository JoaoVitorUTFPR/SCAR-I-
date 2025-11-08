import { useEffect, useState } from "react";
import { getUsuarioSimulados } from "../services/simuladoService";
import SimuladoFinalizado from "../components/SimuladoFinalizado";
import Sidebar from '../components/Sidebar';
import styles from './Download.module.css';

export const Download = () => {

  const [usuarioSimulados, setUsuarioSimulados] = useState([]);

  useEffect(() => {
    const fetchUsuarioSimulados = async () => {
      getUsuarioSimulados().then(setUsuarioSimulados);
    };
    fetchUsuarioSimulados();
  }, []);

  return (
    <div className={styles.container}>

      <Sidebar />
      <div className={styles.content}>
        <h1 className={styles.title}>Nota do Simulado</h1>
        <div className={styles.simuladosList}>
          {usuarioSimulados.map((usuarioSimulado) => (
            <div key={usuarioSimulado.id} className={styles.simuladoCard}>
              <SimuladoFinalizado key={usuarioSimulado.id} usuarioSimuladoId={usuarioSimulado.id} />
              <hr className={styles.divisoria} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}