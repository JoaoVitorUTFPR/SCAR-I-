import styles from "./Simulados.module.css";
import Sidebar from "../components/Sidebar";/* 
import TermoList from "../components/TermoList"; */

function Simulados(){
  return (
    <>
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.content}>
          {/* <TermoList /> */}
        </div>
      </div>
    </>
  );
}

export default Simulados;
