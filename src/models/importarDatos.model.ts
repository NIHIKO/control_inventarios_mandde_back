import * as bdService from '../services/db.service';

export async function importar(usuario: string, numOs: number, listadoDatos: string){
    const consulta = "DECLARE @p1 dbo.TOPE00002;"
                    + listadoDatos
                    + "EXEC ImportarDatosOPE2 "
                    + "@vOpcion = '', "
                    + "@vUsrProcesa = '" + usuario + "', "
                    + "@vNumOS = " + numOs + ", "
                    + "@vTOPE00002 = @p1";
    try{
        const resultado = await bdService.ejecutarConsulta(consulta);
        return resultado.recordset;
    } catch(error){
        console.error('Error ejecutando el método importar:', error);
        throw error;
    }
}