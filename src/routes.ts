import { Request, Response, Router } from "express";

// Cria um roteador
const router = Router();

// Criando sua rota principal para a aplicação
router.get("/", (req:Request, res:Response) => {
    res.json({ mensagem: "Bem-vindo ao meu servidor"});
});

// Exportando as rotas
export{ router };