import * as bdService from '../services/db.service';

export interface Inventario{
	nro_documento?: string;
	cod_barra?: string;
	cod_referencia?: string;
	c_movimiento?: number;
	cod_bodegas?: string;
	talla?: string;
	usuario?: string;
	num_os?: number;
}

export function esValido(objInventario: Inventario){
    if(!objInventario.nro_documento || objInventario.nro_documento == '')
        return false;
    if(!objInventario.cod_barra || objInventario.cod_barra == '')
        return false;
    if(!objInventario.cod_referencia || objInventario.cod_referencia == '')
        return false;
    if(!objInventario.c_movimiento || objInventario.c_movimiento == 0)
        return false;
    if(!objInventario.cod_bodegas || objInventario.cod_bodegas == '')
        return false;
    if(!objInventario.talla || objInventario.talla == '')
        return false;
    if(!objInventario.usuario || objInventario.usuario == '')
        return false;
    if(!objInventario.num_os || objInventario.num_os == 0)
        return false;
    return true;
}

export async function buscarInventario(codBarras: string, numOrden: number){
    const consulta = "EXECUTE ProcesarInventario "
                    + "@vOpcion = 'Consultar_inventario', "
                    + "@vNroDocumento = '', "
                    + "@vUsuario = '', "
                    + "@vCodBarra = " + codBarras + ", "
                    + "@vNumOS = " + numOrden;
    try{
        const resultado = await bdService.ejecutarConsulta(consulta);
        return resultado.recordset;
    } catch(error){
        console.error('Error ejecutando el método buscarInventario:', error);
        throw error;
    }
}

export async function actualizarInventario(objInventario: Inventario){
    const consulta = "EXECUTE ProcesarInventario "
                    + "@vOpcion = 'Actualizar_Inventario', "
                    + "@vNroDocumento = '" + objInventario.nro_documento + "', "
                    + "@vCodBarra = '" + objInventario.cod_barra + "', "
                    + "@vCodReferencia = '" + objInventario.cod_referencia + "', "
                    + "@vCMovimiento = " + objInventario.c_movimiento + ", "
                    + "@vCodBodegaS = '" + objInventario.cod_bodegas + "', "
                    + "@vTalla = '" + objInventario.talla + "', "
                    + "@vUsuario = '" + objInventario.usuario + "', "
                    + "@vNumOS = " + objInventario.num_os;
    try{
        const resultado = await bdService.ejecutarConsulta(consulta);
        return resultado.recordset;
    } catch(error){
        console.error('Error ejecutando el método actualizarInventario:', error);
        throw error;
    }
}
