import * as authService from "../services/authService.js";

export const registrar = async (req, res) => {
	try {
		const usuario = await authService.registrar(
			req.body.nome,
			req.body.email,
			req.body.senha
		);
		res.status(201).json(usuario);
	} catch (error) {
		res
			.status(400)
			.json({ message: "Erro ao registrar usuário", error: error.message });
	}
};

export const login = async (req, res) => {
	try {
		const { token } = await authService.login(req.body.email, req.body.senha);
		res.status(200).json({ token });
	} catch (error) {
		res
			.status(401)
			.json({ message: "Erro ao fazer login", error: error.message });
	}
};

export const validarToken = async (req, res) => { 
	return res.status(200).json(true);
}
