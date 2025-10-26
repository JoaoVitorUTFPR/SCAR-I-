import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getSimulado = () => {
    return prisma.simulado.findMany({});
};

export const getSimuladoId = (simuladoId) => {
    return prisma.simulado.findUnique({
        where: {
            id: simuladoId
        }, include: { questoes: { include: { alternativa: true } } }
    });
}

export const createUsuarioSimulado = async (usuarioId, simuladoId) => {
    const simulado = await getSimuladoId(simuladoId);
    const respostas = simulado.questoes.map(questao => { return { questaoId: questao.id, alternativaId: null } });
    const usuario_simulado = {
        usuarioId,
        simuladoId,
        resposta: respostas
    };
    return prisma.usuario_simulado.create({ data: usuario_simulado });
}

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