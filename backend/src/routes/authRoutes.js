import express from "express";
import * as authController from "../controllers/authController.js";
import { autenticar } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/registrar", authController.registrar);
router.post("/login", authController.login);
router.get("/validar-token", autenticar, authController.validarToken)

export default router;
