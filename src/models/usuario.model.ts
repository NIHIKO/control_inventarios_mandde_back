import * as bdService from '../services/db.service';

export interface UsuarioModel {
    Id_Usuario: number;
    Nom_Usuario: string;
    Num_Documento: number;
    Dir_Usuario: string;
    Tel_Usuario: number;
    Usuario: string;
    Clave: string;
    Cod_Ciudad: string;
    Fec_Procesa: Date;
    Usr_Procesa: number;
    Mca_Activo: boolean;
    Cod_Proyecto: number;
}

export async function buscarUsuario(usuario: string, clave: string){
    const query = "SELECT Id_Usuario, Nom_Usuario, Num_Documento, Dir_Usuario, " +
                    "Tel_Usuario, Usuario, Clave, Cod_Ciudad, Fec_Procesa, Usr_Procesa, " +
                    "Mca_Activo, Cod_Proyecto FROM SGA00001 WHERE Usuario = '" + usuario + "' AND Clave = '" + clave + "'";
    const res = await bdService.ejecutarConsulta(query);
    return res.recordset[0];
}