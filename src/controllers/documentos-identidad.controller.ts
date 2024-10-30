import { Request, Response } from "express";
const tiposDocumentoModel = require('../models/tipos-documento.model');
const utilerias = require('../utils/utilerias');

export async function listarTiposDocumento(req: Request, res: Response){
    let respuesta = await tiposDocumentoModel.listarTiposDocumento();
    if (!respuesta) {
        res.status(401).send({ "codigo": "-1", "mensaje": 'Error obteniendo los tipos de documento'});
    } else {
        res.status(200).send({
            "codigo": "1",
            "mensaje": "lista de tipos de documento",
            "data": respuesta
        });
    }
}

export async function calcularDigitoVerificacion(req: Request, res: Response){
    const numIdentificacion = req.body.numero_documento;
    if(numIdentificacion){
        if(utilerias.esNumerico(numIdentificacion)){
            let respuesta = await tiposDocumentoModel.calcularDigitoVerificacion(numIdentificacion);
            if (!respuesta) {
                res.status(401).send({ "codigo": "-1", "mensaje": 'Error obteniendo el digito de verificacion'});
            } else {
                res.status(200).send({
                    "codigo": "1",
                    "mensaje": "digito de verificacion",
                    "data": respuesta
                });
            }
        } else{
            res.status(400).send({ "codigo": "-1", "mensaje": 'Parametros erroneos'});
        }
    } else{
        res.status(400).send({ "codigo": "-1", "mensaje": 'Parametros incompletos'});
    }
}