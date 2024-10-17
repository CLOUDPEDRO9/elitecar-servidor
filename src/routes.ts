import { Request, Response, Router } from "express";
import { CarroController } from "./controller/CarroController";
import { ClienteController } from "./controller/ClienteController";
import { PedidoVendaController } from "./controller/PedidoVendaController";

// Cria um roteador
const router = Router();

// Criando sua rota principal para a aplicação
router.get("/", (req:Request, res:Response) => {
    res.json({ mensagem: "Bem-vindo ao meu servidor"});
});

router.get('/lista/carro', CarroController.todos);
router.get('/lista/cliente', ClienteController.todos);
router.get('/lista/pedidovenda', PedidoVendaController.todos);

// Exportando as rotas
export{ router };


