import styles from "./Simulados.module.css";
import Sidebar from "../components/Sidebar"; 
import SimuladoList from "../components/simuladoList";

function Simulados(){
  return (
    <>
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.content}>
          {<SimuladoList/>}
        </div>
      </div>
    </>
  );
}

export default Simulados;
