import * as bdService from '../services/db.service';

export interface Ciudad{
    "Cod_Ciudad": number;
    "Cod_Depto": number;
    "nom_ciudad": string;
    "Cod_Pais": number;
    "Nom_Pais": string;
    "Ciudad": string;
    "Mensaje": string;
}

export async function listarCiudades(){
    const consulta = "EXEC CiudadesPA1 @vOpcion = 'Listar_Ciudad'";
    try{
        const resultado = await bdService.ejecutarConsulta(consulta);
        return resultado.recordset;
    } catch(error){
        console.error('Error ejecutando el método listarCiudades:', error);
        throw error;
    }
}
