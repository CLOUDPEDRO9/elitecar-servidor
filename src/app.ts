import  {server } from './server';
import { DatabaseModel } from './model/DatabaseModel';
const port: number = 3333;

new DatabaseModel().testeConexao(). then((resdb) => {
    if(resdb) {
        server.listen(port, () =>{
            console.log(`Endereço do servidor: http://localhost:${port}`)
        });
    } else {
        console.log("Erro ao estabelecer conexão com banco de dados!");
    }
});