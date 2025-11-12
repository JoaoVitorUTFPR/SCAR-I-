import styles from "./Questao.module.css";
import { updateALternativa } from "../services/simuladoService";
import { useState } from "react";

function Questao({ questao, numero, resposta, usuarioSimuladoId }) {
  const [respostaAtual, setRespostaAtual] = useState(resposta);

  const handleChange = (e) => {
    const alternativaEscolhida = e.target.value;
    setRespostaAtual({ questaoId: questao.id, alternativaId: alternativaEscolhida });
    updateALternativa({
      questaoId: questao.id,
      alternativaId: alternativaEscolhida,
      usuarioSimuladoId,
    });
  };

  const letras = ["A", "B", "C", "D", "E"];

  return (
    <div className={styles.questaoCard}>
      <div className={styles.header}>
        <span className={styles.numero}>Questão {numero}</span>
      </div>

      <div className={styles.enunciado}>{questao?.corpo}</div>

      <div className={styles.alternativas}>
        {questao?.alternativa?.map((alt, index) => (
          <label
            key={alt.id}
            htmlFor={`questao${numero}_alt${index}`}
            className={styles.alternativa}
          >
            <input
              checked={alt.id === respostaAtual.alternativaId}
              onChange={handleChange}
              type="radio"
              id={`questao${numero}_alt${index}`}
              name={`questao${numero}`}
              value={alt.id}
              className={styles.radio}
            />
            <span className={styles.letra}>{letras[index]}</span>
            <span className={styles.texto}>{alt.corpo}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default Questao;
