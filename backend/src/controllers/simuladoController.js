import * as simuladoService from "../services/simuladoService.js";

export const getSimulado = async (req, res) => {
	try {
		const simulado = await simuladoService.getSimulado();
		res.status(200).json(simulado);
	} catch (error) {
		res.status(500).json({ message: "Erro", error: error.message });
	}
};

export const getSimuladoId = async (req, res) => {
	try {
		const simulado = await simuladoService.getSimuladoId(req.params.id);
		res.status(200).json(simulado);
	} catch (error) {
		res.status(500).json({ message: "Erro", error: error.message });
	}
};

export const createUsuarioSimulado = async (req, res) => {
	try {
		const simulado = await simuladoService.createUsuarioSimulado(
			req.usuarioId,
			req.params.simuladoId
		);
		res.status(200).json(simulado);
	} catch (error) {
		if (error.message.includes("ERRO_01")) {
			res.status(400).json({
				message: "Não é possível criar ou continuar avaliação.",
				error: error.message,
			});
		}
		res.status(500).json({ message: "Erro", error: error.message });
	}
};

export const finalizarSimulado = async (req, res) => {
	try {
		const simulado = await simuladoService.finalizarSimulado(
			req.params.usuarioSimuladoId
		);
		res.status(200).json(simulado);
	} catch (error) {
		res.status(500).json({ message: "Erro", error: error.message });
	}
};

export const updateAlternativa = async (req, res) => {
	try {
		const simulado = await simuladoService.updateAlternativa(req.body);
		res.status(200).json(simulado);
	} catch (error) {
		res.status(500).json({ message: "Erro", error: error.message });
	}
};

export const getSimuladosUsuario = async (req, res) => {
	try {
		const simulados = await simuladoService.getSimuladosUsuario(req.usuarioId);
		res.status(200).json(simulados);
	} catch (error) {
		res.status(500).json({ message: "Erro", error: error.message });
	}
};

export const calcularNota = async (req, res) => {
	try {
		const resultado = await simuladoService.getNotaSimulado(
			req.params.usuarioSimuladoId
		);
		res.status(200).json(resultado);
	} catch (error) {
		res.status(500).json({ message: "Erro", error: error.message });
	}
};

export const getRelatorio = async (req, res) => {
	try {
		const relatorio = await simuladoService.getRelatorio(
			req.params.usuarioSimuladoId
		);
		res.status(200).json(relatorio);
	} catch (error) {
		res.status(500).json({ message: error.message, error: error.stack });
	}
};

export const getInfoHome = async (req, res) => {
	try {
		const info = await simuladoService.getInfoHome(req.usuarioId);
		res.status(200).json(info);
	} catch (error) {
		res.status(500).json({ message: "Erro", error: error.message });
	}
};

export const getAvaliacaoAtual = async (req, res) => {
	try {
		const info = await simuladoService.getAvaliacaoAtual(req.usuarioId);
		res.status(200).json(info);
	} catch (error) {
		res.status(500).json({ message: "Erro", error: error.message });
	}
};
