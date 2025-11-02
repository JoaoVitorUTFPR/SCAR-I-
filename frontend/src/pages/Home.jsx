import { useEffect, useState } from 'react';
import { getInfoHome } from '../services/simuladoService';
import styles from './Home.module.css'; 
import Sidebar from '../components/Sidebar';
import { PiStudent } from "react-icons/pi";
import { PiCertificateLight } from "react-icons/pi";
/* import { getAvaliacoes } from '../services/simuladoService'; */

function Home() {
  const [totalSimulados, setTotalSimulados] = useState(0);
  const [totalConcluidos, setTotalConcluidos] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const info = await getInfoHome("671b00000000000000000101");
        setTotalSimulados(info.totalSimulados);
        setTotalConcluidos(info.totalConcluidos);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }

    fetchData();
  }, []); 

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <div className={styles.linhacont}>
          <div className={styles.cardSimuladoTotal}>
            <div>
              <i className={styles.iconConcluido}><PiCertificateLight /></i>
            </div>
            <div className={styles.text}>
              <p>Total de simulados</p>
            </div>
            <div className={styles.count}>
              <strong>{totalSimulados}</strong>
            </div>
          </div>

          <div className={styles.cardSimuladoConcluido}>
            <div>
              <i className={styles.iconConcluido}><PiStudent /></i>
            </div>
            <div className={styles.text}>
              <p>Simulados concluídos</p>
            </div>
            <div className={styles.count}>
              <strong>{totalConcluidos}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;