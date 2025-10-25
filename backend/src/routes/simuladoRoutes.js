import express from 'express';
import * as simuladoController from "../controllers/simuladoController.js"

const router = express.Router();

router.get("/simulado", simuladoController.getSimulado);

export default router;