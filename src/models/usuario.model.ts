import path from 'path';
import * as bdService from '../services/db.service';
import { logger } from '../services/log.service';

export async function logueaUsuario(usuario: string, clave: string) {
    const consulta = "EXEC LogueaUsuarios @vOpcion = 'Verifica_Menu_Usuario_Interno', "
                    + "@vUsuario = '" + usuario
                    + "', @vClave = '" + clave + "'";
    try {
        const res = await bdService.ejecutarConsulta(consulta);
        return res.recordset;
    } catch (error) {
        console.error('Error en: ' + path.basename(__filename) + ':logueaUsuario(' + usuario + ',' + clave + ') => ' + error);
        throw error;
    }
}

export async function listarUsuarios(){
    const consulta = "EXEC UsuarioSGA1 @vOpcion = 'Lista Usuarios', "
                    + "@vNumDocumento = '', "
                    + "@vNumDocumentoA = '', "
                    + "@vNomUsuario = '', "
                    + "@vDirUsuario = '', "
                    + "@vTelUsuario = '', "
                    + "@vCodCiudad = '', "
                    + "@vUsuario = '', "
                    + "@vUsuarioA = '', "
                    + "@vClave = '', "
                    + "@vUsrProcesa = '', "
                    + "@vCodPerfil = '', "
                    + "@vMcaActivo = '', "
                    + "@vCodProyecto = ''";
    try{
        const resultado = await bdService.ejecutarConsulta(consulta);
        return resultado.recordset;
    } catch(error){
        console.error('Error ejecutando el método listarUsuarios:', error);
        throw error;
    }
}

export async function buscarUsuarios(tipoBusqueda: string, valor: string){
    const busqueda = (tipoBusqueda === 'Cosulta_NomUsuario')?
                        '@vTxtBuscar = "' + valor + '"':
                        "@vIdUsuario = " + valor;
    const consulta = "EXEC UsuarioSGA1 @vOpcion = '" + tipoBusqueda + "', "
                    + "@vNumDocumento = '', "
                    + "@vNumDocumentoA = '', "
                    + "@vNomUsuario = '', "
                    + "@vDirUsuario = '', "
                    + "@vTelUsuario = '', "
                    + "@vCodCiudad = '', "
                    + "@vUsuario = '', "
                    + "@vUsuarioA = '', "
                    + "@vClave = '', "
                    + "@vUsrProcesa = '', "
                    + "@vCodPerfil = '', "
                    + "@vMcaActivo = '', "
                    + "@vCodProyecto = '', "
                    + busqueda;
    try{
        const resultado = await bdService.ejecutarConsulta(consulta);
        return resultado.recordset;
    } catch(error){
        console.error('Error ejecutando el método buscarUsuarios:', error);
        throw error;
    }
}

export async function cambiarClaveUsuario(id: number, nuevaClave: string){
    const consulta = "EXEC UsuarioSGA1 @vOpcion = 'Actualizar Clave Usuario', "
                    + "@vNumDocumento = '', "
                    + "@vNumDocumentoA = '', "
                    + "@vNomUsuario = '', "
                    + "@vDirUsuario = '', "
                    + "@vTelUsuario = '', "
                    + "@vCodCiudad = '', "
                    + "@vUsuario = '', "
                    + "@vUsuarioA = '', "
                    + "@vUsrProcesa = '', "
                    + "@vCodPerfil = '', "
                    + "@vMcaActivo = '', "
                    + "@vCodProyecto = '', "
                    + "@vIdUsuario = " + id + ", @vClave = '" + nuevaClave + "'";
    try{
        const resultado = await bdService.ejecutarConsulta(consulta);
        return resultado.recordset;
    } catch(error){
        console.error('Error ejecutando el método cambiarClaveUsuario:', error);
        throw error;
    }
}

export async function registrarUsuario(nuevosDatos: any, id?: number){
    const accion = (id)?'Actualizar':'Crear';
    const idUsuario = (id)?id:0;
    const consulta = "DECLARE @p1 dbo.TSGA00004; "
                    + "INSERT INTO @p1 VALUES(" + idUsuario + ", " + nuevosDatos.vCodPerfil + "); "
                    + "EXEC UsuarioSGA1 @vOpcion = '" + accion + "', "
                    + "@vNumDocumento = '" + nuevosDatos.vNumDocumento + "', "
                    + "@vNumDocumentoA = '" + nuevosDatos.vNumDocumentoA + "', "
                    + "@vNomUsuario = '" + nuevosDatos.vNomUsuario + "', "
                    + "@vDirUsuario = '" + nuevosDatos.vDirUsuario + "', "
                    + "@vTelUsuario = '" + nuevosDatos.vTelUsuario + "', "
                    + "@vCodCiudad = '" + nuevosDatos.vCodCiudad + "', "
                    + "@vUsuario = '" + nuevosDatos.vUsuario + "', "
                    + "@vUsuarioA = '" + nuevosDatos.vUsuarioA + "', "
                    + "@vUsrProcesa = '" + nuevosDatos.vUsrProcesa + "', "
                    + "@vCodPerfil = '" + nuevosDatos.vCodPerfil + "', "
                    + "@vMcaActivo = '" + nuevosDatos.vMcaActivo + "', "
                    + "@vCodProyecto = '" + nuevosDatos.vCodProyecto + "', "
                    + "@vIdUsuario = '" + idUsuario + "', "
                    + "@vClave = '" + nuevosDatos.vClave + "', "
                    + "@vTSGA00004=@p1";
    try{
        const resultado = await bdService.ejecutarConsulta(consulta);
        return resultado.recordset;
    } catch(error){
        console.error('Error ejecutando el método registrarUsuario:', error);
        throw error;
    }
}