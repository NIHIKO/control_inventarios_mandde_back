import { Request, Response } from "express";
const ciudadModel = require('../models/ciudad.model');

export async function listarCiudades(req: Request, res: Response){
    let respuesta = await ciudadModel.listarCiudades();
    if (!respuesta) {
        res.status(401).send({ "codigo": "-1", "mensaje": 'Error obteniendo las ciudades'});
    } else {
        res.status(200).send({
            "codigo": "1",
            "mensaje": "lista de ciudades",
            "data": respuesta
        });
    }
}