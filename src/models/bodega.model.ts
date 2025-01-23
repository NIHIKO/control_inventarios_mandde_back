import * as bdService from '../services/db.service';

export async function listarBodegas(){
    const consulta = "EXEC BodegasPA5 @vOpcion = 'Listar_Bodegas'";
    try{
        const resultado = await bdService.ejecutarConsulta(consulta);
        return resultado.recordset;
    } catch(error){
        console.error('Error ejecutando el método listarBodegas:', error);
        throw error;
    }
}
