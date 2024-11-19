import { Request, Response } from "express";
import { PedidoVenda } from "../model/PedidoVenda";

interface PedidoVendaDTO {
    idCliente: number,
    idCarro: number,
    dataPedido: Date,
    valorPedido: number
}

/**
 * A classe `PedidoVendaController` é responsável por controlar as requisições relacionadas aos pedidos de venda.
 * 
 * - Como um controlador dentro de uma API REST, esta classe gerencia as operações relacionadas ao recurso "pedido de venda".
 */
export class PedidoVendaController {

    /**
     * Lista todos os pedidos de venda.
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Lista de pedidos de venda em formato JSON com status 200 em caso de sucesso.
     * @throws Retorna um status 400 com uma mensagem de erro caso ocorra uma falha ao acessar a listagem de pedidos de venda.
     */
    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            let listaPedidos = await PedidoVenda.listagemPedidos();

            return res.status(200).json(listaPedidos);
        } catch (error) {
            console.log('Erro ao acessar listagem de pedidos');
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de pedidos de venda" });
        }
    }

    /**
     * Método controller para cadastrar um novo pedido de venda.
     * 
     * Esta função recebe uma requisição HTTP contendo os dados de um pedido no corpo da requisição
     * e tenta cadastrar este pedido no banco de dados utilizando a função `cadastroPedido`. Caso o cadastro 
     * seja bem-sucedido, retorna uma resposta HTTP 200 com uma mensagem de sucesso. Caso contrário, retorna
     * uma resposta HTTP 400 com uma mensagem de erro.
     * 
     * @param {Request} req - Objeto de requisição HTTP, contendo o corpo com os dados do pedido no formato `PedidoVendaDTO`.
     * @param {Response} res - Objeto de resposta HTTP usado para retornar o status e a mensagem ao cliente.
     * @returns {Promise<Response>} - Retorna uma resposta HTTP com o status 200 em caso de sucesso, ou 400 em caso de erro.
     * 
     * @throws {Error} - Se ocorrer um erro durante o processo de cadastro, uma mensagem é exibida no console e uma 
     *                   resposta HTTP 400 com uma mensagem de erro é enviada ao cliente.
     */
    static async novo(req: Request, res: Response): Promise<Response> {
        try {
            // Recuperando informações do corpo da requisição e colocando em um objeto da interface PedidoVendaDTO
            const pedidoRecebido: PedidoVendaDTO = req.body;

            // Instanciando um objeto do tipo PedidoVenda com as informações recebidas
            const novoPedido = new PedidoVenda(pedidoRecebido.idCliente, 
                                               pedidoRecebido.idCarro, 
                                               pedidoRecebido.dataPedido,
                                               pedidoRecebido.valorPedido);

            // Chama a função de cadastro passando o objeto como parâmetro
            const respostaClasse = await PedidoVenda.cadastroPedido(
                                        pedidoRecebido.idCliente, 
                                        pedidoRecebido.idCarro, 
                                        pedidoRecebido.dataPedido,
                                        pedidoRecebido.valorPedido
            );

            // Verifica a resposta da função
            if(respostaClasse) {
                // Retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Pedido de venda cadastrado com sucesso!" });
            } else {
                // Retorna uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao cadastrar o pedido. Entre em contato com o administrador do sistema." });
            }
            
        } catch (error) {
            // Lança uma mensagem de erro no console
            console.log(`Erro ao cadastrar um pedido de venda. ${error}`);

            // Retorna uma mensagem de erro para quem chamou a função
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o pedido. Entre em contato com o administrador do sistema." });
        }
    }

    /**
     * Método controller para remover um pedido de venda.
     * 
     * Esta função recebe uma requisição HTTP contendo o ID de um pedido a ser removido como parâmetro na URL.
     * Ela tenta remover o pedido correspondente no banco de dados utilizando a função `removerPedido`. 
     * Caso a remoção seja bem-sucedida, retorna uma resposta HTTP 200 com uma mensagem de sucesso. 
     * Caso contrário, retorna uma resposta HTTP 400 com uma mensagem de erro.
     * 
     * @param {Request} req - Objeto de requisição HTTP, contendo o ID do pedido a ser removido na URL.
     * @param {Response} res - Objeto de resposta HTTP usado para retornar o status e a mensagem ao cliente.
     * @returns {Promise<Response>} - Retorna uma resposta HTTP com o status 200 em caso de sucesso, ou 400 em caso de erro.
     * 
     * @throws {Error} - Se ocorrer um erro durante o processo de remoção, uma mensagem é exibida no console e uma 
     *                   resposta HTTP 400 com uma mensagem de erro é enviada ao cliente.
     */
    static async remover(req: Request, res: Response): Promise<Response> {
        try {
            // recuperando o id do pedido que será removido
            const idPedido = parseInt(req.params.idPedido as string);

            // chamando a função de remoção de pedido
            const respostaModelo = await PedidoVenda.removerPedido(idPedido);

            // verificando a resposta da função
            if (respostaModelo) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Pedido removido com sucesso!" });
            } else {
                // retorno uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao remover o pedido. Entre em contato com o administrador do sistema." })
            }
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao remover um pedido. ${error}`);

            // retorna uma mensagem de erro para quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível remover o pedido. Entre em contato com o administrador do sistema." });
        }
    }

    /**
     * Método controller para atualizar os dados de um pedido de venda.
     * 
     * Esta função recebe uma requisição HTTP contendo os dados atualizados de um pedido no corpo da requisição
     * e o ID do pedido a ser atualizado na URL. Ela tenta atualizar o pedido correspondente no banco de dados 
     * utilizando a função `atualizarPedido`. Caso a atualização seja bem-sucedida, retorna uma resposta HTTP 200 
     * com uma mensagem de sucesso. Caso contrário, retorna uma resposta HTTP 400 com uma mensagem de erro.
     * 
     * @param {Request} req - Objeto de requisição HTTP, contendo o corpo com os dados atualizados do pedido no formato `PedidoVendaDTO`
     *                         e o ID do pedido a ser atualizado na URL.
     * @param {Response} res - Objeto de resposta HTTP usado para retornar o status e a mensagem ao cliente.
     * @returns {Promise<Response>} - Retorna uma resposta HTTP com o status 200 em caso de sucesso, ou 400 em caso de erro.
     * 
     * @throws {Error} - Se ocorrer um erro durante o processo de atualização, uma mensagem é exibida no console e uma 
     *                   resposta HTTP 400 com uma mensagem de erro é enviada ao cliente.
     */
    static async atualizar(req: Request, res: Response): Promise<Response> {
        try {

            // recuperando as informações do pedido que serão atualizadas
            const pedidoRecebido: PedidoVendaDTO = req.body;
            // recuperando o id do pedido que será atualizado
            const idPedidoRecebido = parseInt(req.params.idPedido as string);

            // instanciando um objeto do tipo pedido com as informações recebidas
            const pedidoAtualizado = new PedidoVenda(
                pedidoRecebido.idCliente,
                pedidoRecebido.idCarro,
                pedidoRecebido.dataPedido,
                pedidoRecebido.valorPedido);

            // setando o id do pedido que será atualizado
            pedidoAtualizado.setIdPedido(idPedidoRecebido);

            // chamando a função de atualização de pedido
            const resposta = await PedidoVenda.atualizarPedido(pedidoAtualizado);

            // verificando a resposta da função
            if (resposta) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Pedido atualizado com sucesso!" });
            } else {
                // retorno uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao atualizar o pedido. Entre em contato com o administrador do sistema." })
            }
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao atualizar um pedido. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível atualizar o pedido. Entre em contato com o administrador do sistema." });
        }
    }
}