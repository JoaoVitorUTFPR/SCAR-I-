import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const registrar = async (nome, email, senha) => {
	const existing = await prisma.usuario.findFirst({ where: { email } });
	if (existing) {
		throw new Error("Usuário já existe");
	}

	const senhaCriptografada = await bcrypt.hash(senha, 10);
	const usuario = await prisma.usuario.create({
		data: {
			nome: nome,
			email: email,
			senha: senhaCriptografada,
		},
	});
	return usuario;
};

export const login = async (email, senha) => {
	const usuario = await prisma.usuario.findFirst({ where: { email } });
	if (!usuario) {
		throw new Error("Usuário não encontrado");
	}

	const senhaValida = await bcrypt.compare(senha, usuario.senha);
	if (!senhaValida) {
		throw new Error("Senha incorreta");
	}

	const token = jwt.sign({ usuarioId: usuario.id }, JWT_SECRET, {
		expiresIn: "1h",
	});
	return { token };
};
