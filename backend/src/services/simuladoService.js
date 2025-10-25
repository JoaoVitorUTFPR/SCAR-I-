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