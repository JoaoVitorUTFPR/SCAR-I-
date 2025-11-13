import express from "express";
import simuladoRoutes from "./routes/simuladoRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import cors from "cors";

const app = express();

app.use(cors({methods: ["GET", "POST", "PUT", "PATCH", "OPTIONS"]}));
app.use(express.json());

// Rotas
app.use(simuladoRoutes);
app.use(authRoutes);

// Middleware para tratar erros
app.use(errorMiddleware);

export default app;
