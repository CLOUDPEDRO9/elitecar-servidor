import  {server } from './server';
import { DatabaseModel } from './model/DatabaseModel';
const port: number = 3333;

server.listen(port, () =>{
    console.log(`Endereço do servidor: http://localhost:${port}`)
});

new DatabaseModel().testeConexao(). then((resdb) => {
    if(resdb) {
        console.log("Conexão com banco de dados estabelecida com sucesso!");
    } else {
        console.log("Erro ao estabelecer conexão com banco de dados!");
    }
});