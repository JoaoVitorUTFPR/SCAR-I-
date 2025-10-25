import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getSimulado = () => {
    return prisma.simulado.findMany({});
};
