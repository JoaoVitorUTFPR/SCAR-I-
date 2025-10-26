import express from 'express';
import * as simuladoController from "../controllers/simuladoController.js"

const router = express.Router();

router.get("/simulado", simuladoController.getSimulado);
router.get("/simulado/:id", simuladoController.getSimuladoId);
router.post("/usuario_simulado/:usuarioId/:simuladoId", simuladoController.createUsuarioSimulado);
router.patch("/usuario_simulado/alternativa", simuladoController.updateAlternativa);
router.patch("/usuario_simulado/finalizar/:usuarioSimuladoId", simuladoController.finalizarSimulado);

export default router;