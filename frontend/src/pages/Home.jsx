import { useEffect, useState } from 'react';
import { getInfoHome } from '../services/simuladoService';
import styles from './Home.module.css'; 
import Sidebar from '../components/Sidebar';
import simuladosIcon from '../assets/simuladosIcon.svg';
import avaliacaoIcon from '../assets/avaliacaoIcon.svg';
/* import { getAvaliacoes } from '../services/simuladoService'; */

function Home() {
  const [totalSimulados, setTotalSimulados] = useState(0);
  const [totalConcluidos, setTotalConcluidos] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const info = await getInfoHome();
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
              <img src={simuladosIcon} alt="" className={styles.iconTotal}/>
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
              <img src={avaliacaoIcon} alt="" className={styles.iconConcluido}/>
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