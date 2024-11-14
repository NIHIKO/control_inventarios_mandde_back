import * as bdService from '../services/db.service';

export interface TiposDocumento{
    Tipo_Documento: string;
    Nom_Documento: string;
}

export async function listarTiposDocumento(){
    const consulta = "EXEC TipoDocumentosPAR4 @vOpcion = 'Listar'";
    try{
        const resultado = await bdService.ejecutarConsulta(consulta);
        return resultado.recordset;
    } catch(error){
        console.error('Error ejecutando el método listarTiposDocumento:', error);
        throw error;
    }
}

export async function calcularDigitoVerificacion(numDocuento: number){
    const consulta = "EXEC CaculaDigitoVerificacion @vNit = '" + numDocuento + "'";
    try{
        const resultado = await bdService.ejecutarConsulta(consulta);
        return resultado.recordset;
    } catch(error){
        console.error('Error ejecutando el método calcularDigitoVerificacion:', error);
        throw error;
    }
}