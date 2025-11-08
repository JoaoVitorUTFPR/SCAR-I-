import styles from "./Simulados.module.css";
import Sidebar from "../components/Sidebar";
import SimuladoList from "../components/SimuladoList";

function Simulados() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <h2 className={styles.title}>Lista de Simulados</h2>
        <SimuladoList />
      </div>
    </div>
  );
}

export default Simulados;