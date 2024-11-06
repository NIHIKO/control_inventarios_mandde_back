import * as bdService from '../services/db.service';

export async function buscarPerfil(tipoBusqueda: string, proyectoId: number, usuarioId: number){
    const consulta = "EXEC PerfilesSGA2 @vOpcion = '" + tipoBusqueda + "', "
                    + '@vCodProyecto = ' + proyectoId + ', '
                    + '@vIdUsuario = ' + usuarioId ;
    try{
        const resultado = await bdService.ejecutarConsulta(consulta);
        return resultado.recordset;
    } catch(error){
        console.error('Error ejecutando el método buscarPerfil:', error);
        throw error;
    }
}
