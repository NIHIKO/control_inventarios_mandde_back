import path from 'path';
import * as bdService from '../services/db.service';
import * as loggerService from '../services/log.service';


export async function buscarOrden(numOrden: number){
    const consulta = "EXECUTE OrdenesOPE1 "
                    + "@vOpcion = 'Consultar_Ordenes', "
                    + "@vTxtBuscar = '', "
                    + "@vNumOS = " + numOrden + ", "
                    + "@vReferencia = '', "
                    + "@vCodDato = '', "
                    + "@vCodDato1 = '', "
                    + "@vUsuario = ''";
    try{
        const resultado = await bdService.ejecutarConsulta(consulta);
        return resultado.recordset;
    } catch(error){
        console.error('Error ejecutando el método buscarOrden:', error);
        throw error;
    }
}

export async function registrarOrden(nuevosDatos: any, numOrden?: number){
    const accion = (numOrden)?'Actualizar':'Crear';
    const num = (numOrden)?numOrden:'0';
    const consulta = "EXEC OrdenesOPE1 @vOpcion = '" + accion + "', "
                    + "@vNumOS = '" + num + "', "
                    + "@vReferencia = '" + nuevosDatos.vReferencia + "', "
                    + "@vCodDato = '" + nuevosDatos.vCodDato + "', "
                    + "@vCodDato1 = '" + nuevosDatos.vCodDato1 + "', "
                    + "@vUsuario = '" + nuevosDatos.vUsuario + "'";
    try{
        const resultado = await bdService.ejecutarConsulta(consulta);
        return resultado.recordset;
    } catch(error){
        console.error('Error ejecutando el método registrarOrden:', error);
        loggerService.error(error);
        throw error;
    }
}