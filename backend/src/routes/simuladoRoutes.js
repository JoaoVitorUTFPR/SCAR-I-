import express from "express";
import * as simuladoController from "../controllers/simuladoController.js";
import { autenticar } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/simulado", autenticar, simuladoController.getSimulado);
router.get("/simulado/:id", autenticar, simuladoController.getSimuladoId);
router.post(
	"/usuario_simulado/gerar/:simuladoId",
	autenticar,
	simuladoController.createUsuarioSimulado
);
router.patch(
	"/usuario_simulado/alternativa",
	autenticar,
	simuladoController.updateAlternativa
);
router.patch(
	"/usuario_simulado/finalizar/:usuarioSimuladoId",
	autenticar,
	simuladoController.finalizarSimulado
);
router.get(
	"/usuario_simulado/buscar",
	autenticar,
	simuladoController.getSimuladosUsuario
);
router.get(
	"/usuario_simulado/nota/:usuarioSimuladoId",
	autenticar,
	simuladoController.calcularNota
);
router.get(
	"/usuario_simulado/relatorio/:usuarioSimuladoId",
	autenticar,
	simuladoController.getRelatorio
);
router.get("/home/:id", autenticar, simuladoController.getInfoHome);

export default router;
