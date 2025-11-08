import React, { useEffect } from 'react';
import styles from './Relatorio.module.css';
import { getRelatorio } from '../services/simuladoService';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';

const Relatorio = () => {
  const usuarioSimuladoId = useParams().usuarioSimuladoId;
  const [relatorioData, setRelatorioData] = React.useState(null);

  useEffect(() => {
    const fetchRelatorioData = async (usuarioSimuladoId) => {
      const data = await getRelatorio(usuarioSimuladoId);
      if (data) {
        setRelatorioData(data);
      }
    };
    fetchRelatorioData(usuarioSimuladoId);
  }, [usuarioSimuladoId]);

  useEffect(() => {
    if (relatorioData) {
      window.print();
    }
  }, [relatorioData]);

  const mapIndexToLetter = (index) => {
    return String.fromCharCode(65 + index); // 65 é o código ASCII para 'A'
  };

  const paddToTwoDigits = (num) => {
    return num.toString().padStart(2, '0');
  };

  const padWithCommaAndTwoDigits = (num) => {
    return num.toString() + ',00';
  };

  return (
    <div className={styles.container}>
      {relatorioData ? (
        <>
          <header>
            <img src="../assets/logo.png" alt="Logo UTFPR" className={styles.logo} />
            <div className={styles.info}>
              <p><strong>Nome:</strong>{relatorioData?.nomeUsuario}</p>
              <p><strong>Simulado:</strong> {relatorioData?.nomeSimulado}</p>
              <p><strong>Data:</strong> {relatorioData?.data}</p>
            </div>
          </header>
          <hr className={styles.divisoria} />
          <section className={styles.tabelaStatus}>
            <table>
              <thead>
                <tr>
                  <th>Situação/Status</th>
                  <th>Nota</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Concluído</td>
                  <td>{padWithCommaAndTwoDigits(relatorioData?.nota.acertos)}/{padWithCommaAndTwoDigits(relatorioData?.nota.totalQuestoes)}</td>
                </tr>
              </tbody>
            </table>
          </section>
          <h2 className={styles.titulo}>Caderno de Questões</h2>
          {
            relatorioData?.resultado?.map((res, index) => (
              <section key={index} className={styles.questao}>
                <h3>Questão {paddToTwoDigits(index + 1)}</h3>
                <p>{res.questao.corpo}</p>
                <ul className={styles.alternativas}>
                  {res.questao.alternativa.map((alt, altIndex) => (
                    <li key={altIndex}>
                      {`(${mapIndexToLetter(altIndex)}) ${alt.corpo}`}
                      {alt.id === res.respostaUsuario.alternativaId ? " - Escolhida" : ""}
                      {alt.isCorreta ? " - Correta" : ""}
                    </li>
                  ))}
                </ul>
                <p><strong className={styles.resposta}>Resposta:</strong></p>
                <section className={styles.feedback}>
                  <ReactMarkdown>{res?.respostaIA}</ReactMarkdown>
                </section>
              </section>
            ))
          }
          <hr className={styles.divisoria} />
        </>
      ) : <p style={{ "color": "black" }}>Carregando...</p>
      }
    </div>
  );
};

export default Relatorio;