import { Request, Response, Router } from "express";
import CarroController from "./controller/CarroController";
import ClienteController from "./controller/ClienteController";
import PedidoVendaController from "./controller/PedidoVendaController";

// Cria um roteador
const router = Router();

// Criando sua rota principal para a aplicação
router.get("/", (req:Request, res:Response) => {
    res.json({ mensagem: "Bem-vindo ao meu servidor"});
});

router.get('/carro', CarroController.todos);
router.get('/cliente', ClienteController.todos);
router.get('/pedidovenda', PedidoVendaController.todos);

// Exportando as rotas
export{ router };


