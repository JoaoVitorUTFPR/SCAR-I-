import styles from './Sidebar.module.css'; 
import homeIcon from '../assets/homeIcon.svg';
import simuladosIcon from '../assets/simuladosIcon.svg';
import avaliacaoIcon from '../assets/avaliacaoIcon.svg';
import downloadIcon from '../assets/downloadIcon.svg';
import ellp from '../assets/ellp.png'
import { NavLink } from 'react-router-dom';

function Alunos() {

  return (
    <>
        <div className={styles.container}>
            <div className={styles.box1}>
                <div className={styles.title}>
                    <h1>SCAR-I</h1>
                </div>
            </div>
            <div className={styles.box2}>
                <NavLink to="/" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
                    <button>
                        <span>
                            <img src={homeIcon} alt="" className={styles.icon}/>
                            <span className={styles.option}>Home</span>
                        </span>
                    </button>
                </NavLink>
                <NavLink to="/simulados" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
                    <button>
                        <span>
                            <img src={simuladosIcon} alt="" className={styles.icon}/>
                            <span className={styles.option}>Simulados</span>
                        </span>
                    </button>
                </NavLink>
                <NavLink to="/avaliacao" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}> 
                    <button>
                        <span>
                            <img src={avaliacaoIcon} alt="" className={styles.icon}/>
                            <span className={styles.option}>Avaliações</span>
                        </span>
                    </button>
                </NavLink>
                <NavLink to="/download" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
                    <button>
                        <span>
                            <img src={downloadIcon} alt="" className={styles.icon}/>
                            <span className={styles.option}>Download</span>
                        </span>
                    </button>
                </NavLink>
            </div>
            <div className={styles.box3}>
                <img src={ellp} alt="Ellp logo" className={styles.imagem} />
            </div>
        </div>
    </>
  )
}

export default Alunos