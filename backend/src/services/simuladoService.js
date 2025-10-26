import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getSimulado = () => {
    return prisma.simulado.findMany({});
};

export const getSimuladoId = (simuladoId) => {
    return prisma.simulado.findUnique({
        where: {
                id: simuladoId
    },include:{questoes:{include: {alternativa:true}}}
});
}

export const createUsuarioSimulado = async(usuarioId,simuladoId) =>{
    const simulado = await getSimuladoId(simuladoId);
    const respostas = simulado.questoes.map(questao => { return {questaoId: questao.Id, alternativaId: null}});
    const usuario_simulado = {
        usuarioId,
        simuladoId,
        resposta: respostas
    };
    return prisma.usuario_simulado.create({data:usuario_simulado});
}