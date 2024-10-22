import * as bdService from '../services/db.service';

export async function logueaUsuario(usuario: string, clave: string) {
    const query = `
        DECLARE @vOpcion VARCHAR(80) = 'Verifica_Menu_Usuario_Interno',
                @vTxtBuscar VARCHAR(120) = '',
                @vUsuario VARCHAR(20) = '` + usuario + `',
                @vClave VARCHAR(50) = '` + clave + `',
                @result INT;

        EXEC @result = dbo.LogueaUsuarios 'Verifica_Menu_Usuario_Interno', '', @vUsuario, @vClave;
        SELECT @result AS result;
    `;

    try {
        const res = await bdService.ejecutarConsulta(query);
        return res.recordset;
    } catch (error) {
        console.error('Error ejecutando el procedimiento almacenado:', error);
        throw error;
    }
}