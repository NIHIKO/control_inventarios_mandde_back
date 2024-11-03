import path from 'path';
import * as bdService from '../services/db.service';
import { logger } from '../services/log.service';

export async function listarClientes(soloActivos: boolean = false){
    const opcion = soloActivos?'Consultar_Activos':'Listar';
    const consulta = "EXEC ClientesC1 "
                    + "@vOpcion = " + opcion + ","
                    + "@vTxtBuscar = '',"
                    + "@vNumCliente = '',"
                    + "@vNumClienteA = '',"
                    + "@vDigVerificacion = '',"
                    + "@vTipoDocumento = '',"
                    + "@vNomCliente = '',"
                    + "@vDirCliente = '',"
                    + "@vTelCliente = '',"
                    + "@vEmailCliente = '',"
                    + "@vCodCiudad = '',"
                    + "@vUsrModifica = '',"
                    + "@vMcaActivo = '';";
    try{
        const resultado = await bdService.ejecutarConsulta(consulta);
        return resultado.recordset;
    } catch(error){
        console.error('Error ejecutando el método listarClientes:', error);
        throw error;
    }
}

export async function buscarCliente(tipoBusqueda: string, valor: string){
    const busquedaTexto = (tipoBusqueda === 'Consultar_NomCliente')?valor:"";
    const busquedaNum = (tipoBusqueda === 'Consultar_NumCliente')?valor:"";
    const consulta = "EXEC ClientesC1 @vOpcion = '" + tipoBusqueda + "', "
                    + "@vNumClienteA = '',"
                    + "@vDigVerificacion = '',"
                    + "@vTipoDocumento = '',"
                    + "@vNomCliente = '',"
                    + "@vDirCliente = '',"
                    + "@vTelCliente = '',"
                    + "@vEmailCliente = '',"
                    + "@vCodCiudad = '',"
                    + "@vUsrModifica = '',"
                    + "@vMcaActivo = '',"
                    + "@vTxtBuscar = '" + busquedaTexto + "',"
                    + "@vNumCliente = '" + busquedaNum + "'";
    try{
        const resultado = await bdService.ejecutarConsulta(consulta);
        return resultado.recordset;
    } catch(error){
        console.error('Error ejecutando el método buscarUsuarios:', error);
        throw error;
    }
}

export async function listarClientesActivos(){
    const consulta = "EXEC ClientesC1 "
                    + "@vOpcion = 'Consultar_Activos',"
                    + "@vTxtBuscar = '',"
                    + "@vNumCliente = '',"
                    + "@vNumClienteA = '',"
                    + "@vDigVerificacion = '',"
                    + "@vTipoDocumento = '',"
                    + "@vNomCliente = '',"
                    + "@vDirCliente = '',"
                    + "@vTelCliente = '',"
                    + "@vEmailCliente = '',"
                    + "@vCodCiudad = '',"
                    + "@vUsrModifica = '',"
                    + "@vMcaActivo = '';";
    try{
        const resultado = await bdService.ejecutarConsulta(consulta);
        return resultado.recordset;
    } catch(error){
        console.error('Error ejecutando el método listarClientes:', error);
        throw error;
    }
}



export async function registrarCliente(nuevosDatos: any, id?: number){
    const accion = (id)?'Actualizar':'Crear';
    const consulta = "EXEC ClientesC1 @vOpcion = '" + accion + "', "
                    + "@vNumCliente = '" + nuevosDatos.vNumCliente + "', "
                    + "@vNumClienteA = '" + id + "', "
                    + "@vDigVerificacion = '" + nuevosDatos.vDigVerificacion + "', "
                    + "@vTipoDocumento = '" + nuevosDatos.vTipoDocumento + "', "
                    + "@vNomCliente = '" + nuevosDatos.vNomCliente + "', "
                    + "@vDirCliente = '" + nuevosDatos.vDirCliente + "', "
                    + "@vTelCliente = '" + nuevosDatos.vTelCliente + "', "
                    + "@vEmailCliente = '" + nuevosDatos.vEmailCliente + "', "
                    + "@vCodCiudad = '" + nuevosDatos.vCodCiudad + "', "
                    + "@vUsrModifica = '" + nuevosDatos.vUsrModifica + "', "
                    + "@vMcaActivo = '" + nuevosDatos.vMcaActivo + "'"
    try{
        const resultado = await bdService.ejecutarConsulta(consulta);
        return resultado.recordset;
    } catch(error){
        console.error('Error ejecutando el método cambiarClaveUsuario:', error);
        throw error;
    }
}