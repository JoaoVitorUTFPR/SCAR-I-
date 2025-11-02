import { PrismaClient } from "@prisma/client";
import ollama from "ollama";
import { GoogleGenAI } from "@google/genai"
import { prompt } from "../prompt/prompt.js";

const prisma = new PrismaClient();

export const getSimulado = () => {
  return prisma.simulado.findMany({include: {questoes: true}});
};

export const getSimuladoId = (simuladoId) => {
  return prisma.simulado.findUnique({
    where: {
      id: simuladoId
    }, include: { questoes: { include: { alternativa: true } } }
  });
}

export const createUsuarioSimulado = async (usuarioId, simuladoId) => {
    let usuarioSimulado = await prisma.usuario_simulado.findFirst({
        where: {
            usuarioId,
            simuladoId,
        },
        include: {
            simulado: { include: { questoes: { include: { alternativa: true } } } },
        },
    });
    if (!usuarioSimulado) {
        const simulado = await getSimuladoId(simuladoId);
        const respostas = simulado.questoes.map((questao) => {
            return { questaoId: questao.id, alternativaId: null };
        });
        const usuario_simulado = {
            usuarioId,
            simuladoId,
            resposta: respostas,
        };
        usuarioSimulado = prisma.usuario_simulado.create({
            data: usuario_simulado,
            include: {
                simulado: { include: { questoes: { include: { alternativa: true } } } },
            },
        });
    }
    return usuarioSimulado;
};

export const updateAlternativa = async (body) => {
  const usuarioSimulado = await prisma.usuario_simulado.findUnique({
    where: { id: body.usuarioSimuladoId }
  });

  const respostasAtualizadas = [...usuarioSimulado.resposta];
  const indice = respostasAtualizadas.findIndex(
    r => r.questaoId === body.questaoId
  );

  respostasAtualizadas[indice] = {
    questaoId: body.questaoId,
    alternativaId: body.alternativaId
  };

  return await prisma.usuario_simulado.update({
    where: { id: body.usuarioSimuladoId },
    data: {
      resposta: {
        set: respostasAtualizadas
      }
    }
  });
};

export const finalizarSimulado = async (usuarioSimuladoId) => {
  return await prisma.usuario_simulado.update({
    where: { id: usuarioSimuladoId },
    data: {
      dataFim: new Date()
    }
  });
};

export const getSimuladosUsuario = async (usuarioId) => {
  return await prisma.usuario_simulado.findMany({
    where: { usuarioId },
    include: {
      simulado: {
        select: {
          id: true,
          nome: true,
          instituicao: true,
        },
      },
    },
  });
};

export const calcularNota = async (usuarioSimuladoId) => {
  // Busca o simulado do usuário com todos os dados necessários
  const usuarioSimulado = await prisma.usuario_simulado.findUnique({
    where: { id: usuarioSimuladoId },
    include: {
      simulado: {
        include: { questoes: { include: { alternativa: true } } }
      }
    }
  });

  const questoes = usuarioSimulado.simulado.questoes;
  const respostasUsuario = usuarioSimulado.resposta;

  let acertos = 0;

  // Percorre cada questão e compara a alternativa correta
  for (const questao of questoes) {
    const resposta = respostasUsuario.find(r => r.questaoId === questao.id);
    const alternativaCorreta = questao.alternativa.find(a => a.correta === true);

    if (resposta && alternativaCorreta && resposta.alternativaId === alternativaCorreta.id) {
      acertos++;
    }
  }

  const totalQuestoes = questoes.length;
  const nota = (acertos / totalQuestoes) * 100; // percentual

  // Atualiza o registro com a nota e dataFim, caso ainda não tenha
  const atualizacao = {
    nota,
    acertos,
    dataFim: usuarioSimulado.dataFim || new Date()
  };

  await prisma.usuario_simulado.update({
    where: { id: usuarioSimuladoId },
    data: { dataFim: usuarioSimulado.dataFim || new Date() }
  });

  return atualizacao
};

export const getRelatorio = async (usuarioSimuladoId) => {
  // Busca o simulado do usuário com todos os dados necessários
  const usuarioSimulado = await prisma.usuario_simulado.findUnique({
    where: { id: usuarioSimuladoId },
    include: {
      simulado: {
        include: { questoes: { include: { alternativa: true } } }
      }
    }
  });

  const questoes = usuarioSimulado.simulado.questoes;
  const respostasUsuario = usuarioSimulado.resposta;
  const promptPorQuestao = questoes.map((questao) => {
    const respostaUsuario = respostasUsuario.find(r => r.questaoId === questao.id);
    const corretaCorpo = questao.alternativa.find(a => a.isCorreta === true);
    const usuarioEscolha = questao.alternativa.find(a => a.id === respostaUsuario.alternativaId).corpo;
    const prompt = prompt(questao, corretaCorpo, usuarioEscolha);
    return { questao, prompt, respostaUsuario };
  });
  //const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const resultado = await Promise.all(
    promptPorQuestao.map(async (objeto) => {
      //  const respostaIA = await ai.models.generateContent({
      //   model: "gemini-2.5-flash",
      //   contents: objeto.prompt,
      // });
      const respostaIA = await ollama.chat({
        model: 'phi3',
        messages: [{ role: 'user', content: objeto.prompt }],
        host: "http://127.0.0.1:11434"
      })
      return { questao: objeto.questao, respostaIA, respostaUsuario: objeto.respostaUsuario };
    })
  )
  return resultado;
};

export const getInfoHome = async (id) => {
    const totalSimulados = await prisma.simulado.count();
    const totalConcluidos = await prisma.usuario_simulado.count({
        where: {
          usuarioId: id,
          dataFim: {
                not: null,
            },
        },
    });
    return { totalSimulados, totalConcluidos };
};