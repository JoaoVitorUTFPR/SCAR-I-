import { useEffect, useState } from 'react';
import styles from './Home.module.css'; 
import Sidebar from '../components/Sidebar';
import { PiStudent } from "react-icons/pi";
import { PiCertificateLight } from "react-icons/pi";
/* import { getAvaliacoes } from '../services/simuladoService'; */

function Home() {
  const [totalAvaliacoes, setTotalAvaliacoes] = useState(0);
  const [totalTermos, setTotalTermos] = useState(0);

/*   useEffect(() => {
    async function fetchData() {
      try {
        const avaliacoess = await getAvaliacoes();
        const termos = await getTermos();
        setTotalAvaliacoes(avaliacoess.length);
        setTotalTermos(termos.length);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }

    fetchData();
  }, []); */

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <div className={styles.linhacont}>
          <div className={styles.cardTermo}>
            <div>
              <i className={styles.iconTermo}><PiCertificateLight /></i>
            </div>
            <div className={styles.text}>
              <p>Total de simulados</p>
            </div>
            <div className={styles.count}>
              <strong>{totalTermos}</strong>
            </div>
          </div>

          <div className={styles.cardAluno}>
            <div>
              <i className={styles.iconAluno}><PiStudent /></i>
            </div>
            <div className={styles.text}>
              <p>Simulados concluídos</p>
            </div>
            <div className={styles.count}>
              <strong>{totalAvaliacoes}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;