import { PrismaClient } from "@prisma/client";
import ollama from "ollama";
import { GoogleGenAI } from "@google/genai";
import { getPrompt } from "../prompt/prompt.js";
import { formatDate } from "../utils/utils.js";

const prisma = new PrismaClient();

export const getSimulado = () => {
	return prisma.simulado.findMany({ include: { questoes: true } });
};

export const getSimuladoId = (simuladoId) => {
	return prisma.simulado.findUnique({
		where: {
			id: simuladoId,
		},
		include: { questoes: { include: { alternativa: true } } },
	});
};

export const createUsuarioSimulado = async (usuarioId, simuladoId) => {
	if (!(await _podeComecarAvaliacao(usuarioId, simuladoId))) {
		throw new Error(
			"ERRO_01: Finalize a avaliação atual antes de começar outra."
		);
	}

	let usuarioSimulado = await prisma.usuario_simulado.findFirst({
		where: {
			usuarioId,
			simuladoId,
		},
		include: {
			simulado: { include: { questoes: { include: { alternativa: true } } } },
		},
		orderBy: {
			dataInicio: "desc",
		},
	});
	if (!usuarioSimulado || usuarioSimulado.dataFim) {
		const simulado = await getSimuladoId(simuladoId);
		const respostas = simulado.questoes.map((questao) => {
			return { questaoId: questao.id, alternativaId: null };
		});
		const usuario_simulado = {
			usuarioId,
			simuladoId,
			resposta: respostas,
		};
		usuarioSimulado = await prisma.usuario_simulado.create({
			data: usuario_simulado,
			include: {
				simulado: { include: { questoes: { include: { alternativa: true } } } },
			},
		});
	}
	return usuarioSimulado;
};

export const getAvaliacaoAtual = async (usuarioId) => {
	const usuarioSimulado = await prisma.usuario_simulado.findFirst({
		where: {
			usuarioId,
			dataFim: {
				isSet: false,
			},
		},
		include: {
			simulado: { include: { questoes: { include: { alternativa: true } } } },
		},
	});
	return usuarioSimulado;
};

const _podeComecarAvaliacao = async (usuarioId, simuladoId) => {
	const usuarioSimulado = await prisma.usuario_simulado.findFirst({
		where: {
			usuarioId,
			dataFim: {
				isSet: false,
			},
		},
	});

	return !usuarioSimulado || usuarioSimulado.simuladoId == simuladoId;
};

export const updateAlternativa = async (body) => {
	const usuarioSimulado = await prisma.usuario_simulado.findUnique({
		where: { id: body.usuarioSimuladoId },
	});

	const respostasAtualizadas = [...usuarioSimulado.resposta];
	const indice = respostasAtualizadas.findIndex(
		(r) => r.questaoId === body.questaoId
	);

	respostasAtualizadas[indice] = {
		questaoId: body.questaoId,
		alternativaId: body.alternativaId,
	};

	return await prisma.usuario_simulado.update({
		where: { id: body.usuarioSimuladoId },
		data: {
			resposta: {
				set: respostasAtualizadas,
			},
		},
	});
};

export const finalizarSimulado = async (usuarioSimuladoId) => {
	return await prisma.usuario_simulado.update({
		where: { id: usuarioSimuladoId },
		data: {
			dataFim: new Date(),
		},
	});
};

export const getSimuladosUsuario = async (usuarioId) => {
	return await prisma.usuario_simulado.findMany({
		where: { usuarioId, dataFim: { not: null } },
		include: {
			simulado: {
				select: {
					id: true,
					nome: true,
					instituicao: true,
				},
			},
		},
		orderBy: {
			dataFim: "desc",
		},
	});
};

export const getNotaSimulado = async (usuarioSimuladoId) => {
	// Busca o simulado do usuário com todos os dados necessários
	const usuarioSimulado = await prisma.usuario_simulado.findUnique({
		where: { id: usuarioSimuladoId },
		include: {
			simulado: {
				include: { questoes: { include: { alternativa: true } } },
			},
		},
	});

	const questoes = usuarioSimulado.simulado.questoes;
	const respostasUsuario = usuarioSimulado.resposta;

	await prisma.usuario_simulado.update({
		where: { id: usuarioSimuladoId },
		data: { dataFim: usuarioSimulado.dataFim || new Date() },
	});

	const nota = await _calcularNota(questoes, respostasUsuario);

	return {
		...nota,
		nomeSimulado: usuarioSimulado.simulado.nome,
		dataFim: formatDate(usuarioSimulado.dataFim),
	};
};

const _calcularNota = async (questoes, respostasUsuario) => {
	let acertos = 0;

	// Percorre cada questão e compara a alternativa correta
	for (const questao of questoes) {
		const resposta = respostasUsuario.find((r) => r.questaoId === questao.id);
		const alternativaCorreta = questao.alternativa.find(
			(a) => a.isCorreta === true
		);

		if (
			resposta &&
			alternativaCorreta &&
			resposta.alternativaId === alternativaCorreta.id
		) {
			acertos++;
		}
	}

	const totalQuestoes = questoes.length;
	const nota = (acertos / totalQuestoes) * 100;

	return {
		nota,
		acertos,
		totalQuestoes,
	};
};

export const getRelatorio = async (usuarioSimuladoId) => {
	// Busca o simulado do usuário com todos os dados necessários
	const usuarioSimulado = await prisma.usuario_simulado.findUnique({
		where: { id: usuarioSimuladoId },
		include: {
			usuario: true,
			simulado: {
				include: { questoes: { include: { alternativa: true } } },
			},
		},
	});

	const questoes = usuarioSimulado.simulado.questoes;
	const respostasUsuario = usuarioSimulado.resposta;
	const promptPorQuestao = questoes.map((questao) => {
		const respostaUsuario = respostasUsuario.find(
			(r) => r.questaoId === questao.id
		);
		const corretaCorpo = questao.alternativa.find((a) => a.isCorreta === true);
		let usuarioEscolha = questao.alternativa.find(
			(a) => a.id === respostaUsuario.alternativaId
		);
		if (!usuarioEscolha) {
			usuarioEscolha = { corpo: "NÃO RESPONDIDA" };
		}
		const prompt = getPrompt(questao, corretaCorpo.corpo, usuarioEscolha.corpo);
		return { questao, prompt, respostaUsuario };
	});
	//const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
	const resultado = await Promise.all(
		promptPorQuestao.map(async (objeto, index) => {
			/*
			const respostaIA = (
				await ai.models.generateContent({
					model: "gemini-2.5-flash",
					contents: objeto.prompt,
				})
			).candidates[0].content.parts[0].text;
			*/
			const respostaIA = await ollama.chat({
				model: "llama3.2",
				messages: [{ role: "user", content: objeto.prompt }],
				host: "http://127.0.0.1:11434",
			});
			console.log("Gerou " + parseInt(index + 1));

			return {
				questao: objeto.questao,
				respostaIA: respostaIA.message.content,
				respostaUsuario: objeto.respostaUsuario,
			};
		})
	);

	const nota = await _calcularNota(questoes, respostasUsuario);

	return {
		nomeUsuario: usuarioSimulado.usuario.nome,
		nomeSimulado: usuarioSimulado.simulado.nome,
		data: formatDate(usuarioSimulado.dataFim),
		resultado,
		nota,
	};
};

export const getInfoHome = async (id) => {
	const totalSimulados = await prisma.simulado.count();
	const totalConcluidos = await prisma.usuario_simulado.findMany({
		where: {
			usuarioId: id,
			dataFim: {
				not: null,
			},
		},
		distinct: ["simuladoId"],
	});
	return { totalSimulados, totalConcluidos: totalConcluidos.length };
};
