import styles from './Sidebar.module.css'; 
import homeIcon from '../assets/homeIcon.png';
import termosIcon from '../assets/simuladosIcon.png';
import alunoIcon from '../assets/avaliacaoIcon.png';
import downloadIcon from '../assets/downloadIcon.png';
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
                            <i className={styles.icon}><IoHomeOutline /></i>
                            <span className={styles.option}>Home</span>
                        </span>
                    </button>
                </NavLink>
                <NavLink to="/termos" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
                    <button>
                        <span>
                            <i className={styles.icon}><PiCertificateLight /></i>
                            <span className={styles.option}>Simulados</span>
                        </span>
                    </button>
                </NavLink>
                <NavLink to="/alunos" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}> 
                    <button>
                        <span>
                            <i className={styles.icon}><PiStudent /></i>
                            <span className={styles.option}>Avaliações</span>
                        </span>
                    </button>
                </NavLink>
                <NavLink to="/emissao" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
                    <button>
                        <span>
                            <i className={styles.icon}><FaRegFilePdf /></i>
                            <span className={styles.option}>Dowload</span>
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