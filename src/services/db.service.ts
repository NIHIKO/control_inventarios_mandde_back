
const mssql = require("mssql");
const config_bd = require("../config/db");

async function conectarBD(){
    await mssql.connect(config_bd);
}

async function desconectarBD(){
    await mssql.close();
}

export async function ejecutarConsulta(consulta: string) {
    try{
        await conectarBD();
        return await mssql.query(consulta);
    } catch(ex){
        console.error(ex);
        return -1;
    } finally{
        desconectarBD();
    }
}