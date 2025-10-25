import * as simuladoService from "../services/simuladoService.js"

export const getSimulado = async(req, res) =>{
    try{
        const simulado = await simuladoService.getSimulado();
            res.status(200).json(simulado);
    }catch{
        res.status(500).json({ message: "Erro", error });
    }
};