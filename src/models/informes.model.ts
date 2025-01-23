import * as bdService from '../services/db.service';

export async function listarInformes(){
    const consulta = "EXECUTE FiltroInformesPAR7";
    try{
        const resultado = await bdService.ejecutarConsulta(consulta);
        return resultado.recordset;
    } catch(error){
        console.error('Error ejecutando el método listarInformes:', error);
        throw error;
    }
}

export async function generarInforme(tipoInforme: string, numOrden: string, fechaInicio: string, fechaFin: string){
    const consulta = "EXECUTE Informes "
                    + "@vOpcion = '" + tipoInforme + "', "
	                + "@vTxtBuscar = '" + numOrden + "', "
	                + "@vFecInicial = '" + fechaInicio + "', "
	                + "@vFecFinal = '" + fechaFin + "'";
    try{
        const resultado = await bdService.ejecutarConsulta(consulta);
        return resultado.recordset;
    } catch(error){
        console.error('Error ejecutando el método buscarOrden:', error);
        throw error;
    }
}
