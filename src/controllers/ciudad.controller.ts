import { Request, Response } from "express";
const ciudadModel = require('../models/ciudad.model');

export async function listarCiudades(req: Request, res: Response){
    try{
        let respuesta = await ciudadModel.listarCiudades();
        if (!respuesta) {
            res.status(403).send({ "codigo": "-1", "mensaje": 'Error obteniendo las ciudades'});
        } else {
            res.status(200).send({
                "codigo": "1",
                "mensaje": "lista de ciudades",
                "data": respuesta
            });
        }
    } catch(ex){
        console.log("Se ha presentado un error");
        res.status(500).send({ "codigo": "-1", "mensaje": 'Se ha presentado un error, intente nuevamente'});
    }
}