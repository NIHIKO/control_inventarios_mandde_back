import { Request, Response } from "express";
const perfilModel = require('../models/perfil.model');

export async function buscarPerfil(req: Request, res: Response){
    const opcionBuscar = (req.params.usuarioId)?'Listar_PerfilesUsuarios':'Listar';
    const tipoLista = (req.params.usuarioId)?'usuario':'proyecto';
    const proyectoId = (req.params.proyectoId)?req.params.proyectoId:0;
    const usuarioId = (req.params.usuarioId)?req.params.usuarioId:0;
    try{
        let respuesta = await perfilModel.buscarPerfil(opcionBuscar, proyectoId, usuarioId);
        if (respuesta[0]?.Mensaje) {
            res.status(403).send({ "codigo": "-1", "mensaje": respuesta[0].Mensaje });
        } else {
            res.status(200).send({
                "codigo": "1",
                "mensaje": "lista de perfiles del " + tipoLista,
                "data": respuesta
            });
        }
    } catch(ex){
        console.log("Se ha presentado un error");
        res.status(500).send({ "codigo": "-1", "mensaje": 'Se ha presentado un error, intente nuevamente'});
    }
}