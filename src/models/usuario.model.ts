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
                    + "@vNumDocumento = '', @vNumDocumentoA = '', "
                    + "@vNomUsuario = '', @vDirUsuario = '', "
                    + "@vTelUsuario = '', @vCodCiudad = '', "
                    + "@vUsuario = '', @vUsuarioA = '', "
                    + "@vClave = '', @vUsrProcesa = '', "
                    + "@vUsrCaptura = '', @vUsrModifica = '', "
                    + "@vCodPerfil = '', @vMcaActivo = '', "
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
                    + "@vNumDocumento = '', @vNumDocumentoA = '', "
                    + "@vNomUsuario = '', @vDirUsuario = '', "
                    + "@vTelUsuario = '', @vCodCiudad = '', "
                    + "@vUsuario = '', @vUsuarioA = '', "
                    + "@vClave = '', @vUsrProcesa = '', "
                    + "@vUsrCaptura = '', @vUsrModifica = '', "
                    + "@vCodPerfil = '', @vMcaActivo = '', "
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