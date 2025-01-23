import { Request, Response } from "express";
const bodegaModel = require('../models/bodega.model');

export async function listarBodegas(req: Request, res: Response){
    try{
        let respuesta = await bodegaModel.listarBodegas();
        if (!respuesta) {
            res.status(403).send({ "codigo": "-1", "mensaje": 'Error obteniendo las bodegas'});
        } else {
            res.status(200).send({
                "codigo": "1",
                "mensaje": "lista de bodegas",
                "data": respuesta
            });
        }
    } catch(ex){
        console.log("Se ha presentado un error");
        res.status(500).send({ "codigo": "-1", "mensaje": 'Se ha presentado un error, intente nuevamente'});
    }
}