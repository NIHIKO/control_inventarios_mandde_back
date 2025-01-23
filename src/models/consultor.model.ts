import * as bdService from '../services/db.service';

export async function listarFiltros(){
    const consulta = "EXECUTE FiltroConsultaPAR6";
    try{
        const resultado = await bdService.ejecutarConsulta(consulta);
        return resultado.recordset;
    } catch(error){
        console.error('Error ejecutando el método listarFiltros:', error);
        throw error;
    }
}

export async function consultorDetallado(codBarras: string, numOrden: number){
    const consulta = "EXECUTE ConsultorDetalladoMov "
                    + "@vCodBarra = '" + codBarras + "',"
                    + "@vNumOS = " + numOrden;
    try{
        const resultado = await bdService.ejecutarConsulta(consulta);
        return resultado.recordset;
    } catch(error){
        console.error('Error ejecutando el método consultorDetallado:', error);
        throw error;
    }
}

export async function consultorGeneral(opcion: string, txtBusqueda: string, fechaInicio: string = '', fechaFin: string = ''){
    const consulta = "EXECUTE ConsultorGeneral "
                    + "@vOpcion = '" + opcion + "',"
                    + "@vTxtBuscar = '" + txtBusqueda + "', "
                    + "@vFecCapturaI = '" + fechaInicio + "',"
                    + "@vFecCapturaF = '" + fechaFin + "'";
    try{
        const resultado = await bdService.ejecutarConsulta(consulta);
        return resultado.recordset;
    } catch(error){
        console.error('Error ejecutando el método consultorGeneral:', error);
        throw error;
    }
}
