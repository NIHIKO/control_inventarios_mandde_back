import { Request, Response } from "express";
const informesModel = require('../models/informes.model');

export async function listarInformes(req: Request, res: Response){
    try{
        let respuesta = await informesModel.listarInformes();
        if (!respuesta) {
            res.status(403).send({ "codigo": "-1", "mensaje": "Se ha producido un error" });
        } else {
            res.status(200).send({
                "codigo": "1",
                "mensaje": "lista de informes",
                "data": respuesta
            });
        }
    } catch(ex){
        console.log("Se ha presentado un error");
        res.status(500).send({ "codigo": "-1", "mensaje": 'Se ha presentado un error, intente nuevamente'});
    }
}

export async function generarInforme(req: Request, res: Response){
    const {tipoInforme, numOrden, fechaInicio, fechaFin} = req.body;
    if(!tipoInforme || !numOrden || !fechaInicio || !fechaFin){
        res.status(400).send({ "codigo": "-1", "mensaje": 'Parametros incompletos'});
        return;
    }
    try{
        let respuesta = await informesModel.generarInforme(tipoInforme, numOrden, fechaInicio, fechaFin);
        if (!respuesta) {
            res.status(403).send({ "codigo": "-1", "mensaje": "Se ha producido un error" });
        } else {
            res.status(200).send({
                "codigo": "1",
                "mensaje": "Datos del informe",
                "data": respuesta
            });
        }
    } catch(ex){
        console.log("Se ha presentado un error");
        res.status(500).send({ "codigo": "-1", "mensaje": 'Se ha presentado un error, intente nuevamente'});
    }
}
