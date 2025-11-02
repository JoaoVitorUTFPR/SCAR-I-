import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const autenticar = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).json({ message: "Token não fornecido" });
	}

	const token = authHeader.split(" ")[1];
	if (!token) {
		return res.status(401).json({ message: "Token inválido" });
	}

	try {
		const tokenDecodificado = jwt.verify(token, JWT_SECRET);
		req.usuarioId = tokenDecodificado.usuarioId;
		next();
	} catch (error) {
		return res
			.status(401)
			.json({ message: "Token inválido", error: error.message });
	}
};
