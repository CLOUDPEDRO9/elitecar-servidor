import { Request, Response } from "express";
import { Cliente } from "../model/Cliente";

interface ClienteDTO {
    nome: string,
    cpf: string,
    telefone: string
}

/**
* A classe `ClienteController` é responsável por controlar as requisições relacionadas aos clientes.
* 
* - Como um controlador em uma API REST, esta classe gerencia as operações relacionadas ao recurso "cliente".
*/
export class ClienteController {

    /**
     * Lista todos os clientes.
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Lista de clientes em formato JSON com status 200 em caso de sucesso.
     * @throws Retorna um status 400 com uma mensagem de erro caso ocorra uma falha ao acessar a listagem de clientes.
     */
    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            const listaDeClientes = await Cliente.listagemClientes();
            console.log(listaDeClientes);
            
            return res.status(200).json(listaDeClientes);
        } catch (error) {
            console.log('Erro ao acessar listagem de clientes');
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de clientes" });
        }
    }

    /**
     * Método controller para cadastrar um novo cliente.
     * 
     * Esta função recebe uma requisição HTTP contendo os dados de um cliente no corpo da requisição
     * e tenta cadastrar este cliente no banco de dados utilizando a função `cadastroCliente`. Caso o cadastro 
     * seja bem-sucedido, retorna uma resposta HTTP 200 com uma mensagem de sucesso. Caso contrário, retorna
     * uma resposta HTTP 400 com uma mensagem de erro.
     * 
     * @param {Request} req - Objeto de requisição HTTP, contendo o corpo com os dados do cliente no formato `ClienteDTO`.
     * @param {Response} res - Objeto de resposta HTTP usado para retornar o status e a mensagem ao cliente.
     * @returns {Promise<Response>} - Retorna uma resposta HTTP com o status 200 em caso de sucesso, ou 400 em caso de erro.
     * 
     * @throws {Error} - Se ocorrer um erro durante o processo de cadastro, uma mensagem é exibida no console e uma 
     *                   resposta HTTP 400 com uma mensagem de erro é enviada ao cliente.
     */
    static async novo(req: Request, res: Response): Promise<Response> {
        try {
            // Recuperando informações do corpo da requisição e colocando em um objeto da interface ClienteDTO
            const clienteRecebido: ClienteDTO = req.body;

            // Instanciando um objeto do tipo cliente com as informações recebidas
            const novoCliente = new Cliente(clienteRecebido.nome, 
                                            clienteRecebido.cpf, 
                                            clienteRecebido.telefone);

            // Chama a função de cadastro passando o objeto como parâmetro
            const respostaClasse = await Cliente.cadastroCliente(novoCliente);

            // Verifica a resposta da função
            if(respostaClasse) {
                // Retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Cliente cadastrado com sucesso!" });
            } else {
                // Retorna uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao cadastrar o cliente. Entre em contato com o administrador do sistema." });
            }
            
        } catch (error) {
            // Lança uma mensagem de erro no console
            console.log(`Erro ao cadastrar um cliente. ${error}`);

            // Retorna uma mensagem de erro para quem chamou a função
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o cliente. Entre em contato com o administrador do sistema." });
        }
    }

    /**
     * Método controller para remover um cliente.
     * 
     * Esta função recebe uma requisição HTTP contendo o ID de um cliente a ser removido como parâmetro na URL.
     * Ela tenta remover o cliente correspondente no banco de dados utilizando a função `removerCliente`. 
     * Caso a remoção seja bem-sucedida, retorna uma resposta HTTP 200 com uma mensagem de sucesso. 
     * Caso contrário, retorna uma resposta HTTP 400 com uma mensagem de erro.
     * 
     * @param {Request} req - Objeto de requisição HTTP, contendo o ID do cliente a ser removido na URL.
     * @param {Response} res - Objeto de resposta HTTP usado para retornar o status e a mensagem ao cliente.
     * @returns {Promise<Response>} - Retorna uma resposta HTTP com o status 200 em caso de sucesso, ou 400 em caso de erro.
     * 
     * @throws {Error} - Se ocorrer um erro durante o processo de remoção, uma mensagem é exibida no console e uma 
     *                   resposta HTTP 400 com uma mensagem de erro é enviada ao cliente.
     */
    static async remover(req: Request, res: Response): Promise<Response> {
        try {
            // recuperando o id do cliente que será removido
            const idCliente = parseInt(req.params.idCliente as string);

            // chamando a função de remoção de cliente
            const respostaModelo = await Cliente.removerCliente(idCliente);

            // verificando a resposta da função
            if (respostaModelo) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Cliente removido com sucesso!" });
            } else {
                // retorno uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao remover o cliente. Entre em contato com o administrador do sistema." })
            }
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao remover um cliente. ${error}`);

            // retorna uma mensagem de erro para quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível remover o cliente. Entre em contato com o administrador do sistema." });
        }
    }

    /**
     * Método controller para atualizar os dados de um cliente.
     * 
     * Esta função recebe uma requisição HTTP contendo os dados atualizados de um cliente no corpo da requisição
     * e o ID do cliente a ser atualizado na URL. Ela tenta atualizar o cliente correspondente no banco de dados 
     * utilizando a função `atualizarCliente`. Caso a atualização seja bem-sucedida, retorna uma resposta HTTP 200 
     * com uma mensagem de sucesso. Caso contrário, retorna uma resposta HTTP 400 com uma mensagem de erro.
     * 
     * @param {Request} req - Objeto de requisição HTTP, contendo o corpo com os dados atualizados do cliente no formato `ClienteDTO`
     *                         e o ID do cliente a ser atualizado na URL.
     * @param {Response} res - Objeto de resposta HTTP usado para retornar o status e a mensagem ao cliente.
     * @returns {Promise<Response>} - Retorna uma resposta HTTP com o status 200 em caso de sucesso, ou 400 em caso de erro.
     * 
     * @throws {Error} - Se ocorrer um erro durante o processo de atualização, uma mensagem é exibida no console e uma 
     *                   resposta HTTP 400 com uma mensagem de erro é enviada ao cliente.
     */
    static async atualizar(req: Request, res: Response): Promise<Response> {
        try {

            // recuperando as informações do cliente que serão atualizadas
            const clienteRecebido: ClienteDTO = req.body;
            // recuperando o id do cliente que será atualizado
            const idClienteRecebido = parseInt(req.params.idCliente as string);

            // instanciando um objeto do tipo cliente com as informações recebidas
            const clienteAtualizado = new Cliente(
                clienteRecebido.nome,
                clienteRecebido.cpf,
                clienteRecebido.telefone);

            // setando o id do cliente que será atualizado
            clienteAtualizado.setIdCliente(idClienteRecebido);

            // chamando a função de atualização de cliente
            const resposta = await Cliente.atualizarCliente(clienteAtualizado);

            // verificando a resposta da função
            if (resposta) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Cliente atualizado com sucesso!" });
            } else {
                // retorno uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao atualizar o cliente. Entre em contato com o administrador do sistema." })
            }
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao atualizar um cliente. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível atualizar o cliente. Entre em contato com o administrador do sistema." });
        }
    }
}
