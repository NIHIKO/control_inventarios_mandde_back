import { Request, Response } from "express";
const tiposDocumentoModel = require('../models/tipos-documento.model');
const utilerias = require('../utils/utilerias');

export async function listarTiposDocumento(req: Request, res: Response){
    try{
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
    } catch(ex){
        console.log("Se ha presentado un error");
        res.status(500).send({ "codigo": "-1", "mensaje": 'Se ha presentado un error, intente nuevamente'});
    }
}

export async function calcularDigitoVerificacion(req: Request, res: Response){
    const numIdentificacion = req.body.numero_documento;
    if(numIdentificacion){
        if(utilerias.esNumerico(numIdentificacion)){
            try{
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
            } catch(ex){
                console.log("Se ha presentado un error");
                res.status(500).send({ "codigo": "-1", "mensaje": 'Se ha presentado un error, intente nuevamente'});
            }
        } else{
            res.status(400).send({ "codigo": "-1", "mensaje": 'Parametros erroneos'});
        }
    } else{
        res.status(400).send({ "codigo": "-1", "mensaje": 'Parametros incompletos'});
    }
}