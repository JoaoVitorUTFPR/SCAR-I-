import express from "express";
import simuladoRoutes from "./routes/simuladoRoutes.js";
import alunoRoutes from "./routes/alunoRoutes.js";
import termoRoutes from "./routes/termoRoutes.js";
import pdfRoutes from "./routes/pdfRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use(alunoRoutes);
app.use(termoRoutes);
app.use(pdfRoutes);
app.use(simuladoRoutes);
app.use(authRoutes);

// Middleware para tratar erros
app.use(errorMiddleware);

export default app;
