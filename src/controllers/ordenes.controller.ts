import { Request, Response } from "express";
const ordenModel = require('../models/orden.model');

export async function buscarOrden(req: Request, res: Response){
    const numOrden = req.params.num;
    if(!numOrden){
        res.status(400).send({ "codigo": "-1", "mensaje": 'Parametros incompletos'});
        return;
    }
    try{
        let respuesta = await ordenModel.buscarOrden(numOrden);
        if (!respuesta) {
            res.status(401).send({ "codigo": "-1", "mensaje": "Se ha producido un error" });
        } else {
            res.status(200).send({
                "codigo": "1",
                "mensaje": "datos de la orden",
                "data": respuesta
            });
        }
    } catch(ex){
        console.log("Se ha presentado un error");
        res.status(500).send({ "codigo": "-1", "mensaje": 'Se ha presentado un error, intente nuevamente'});
    }
}

export async function buscarOrdenFecha(req: Request, res: Response){
    const {fechaInicio, fechaFin} = req.body;
    if(!fechaInicio || !fechaFin){
        res.status(400).send({ "codigo": "-1", "mensaje": 'Parametros incompletos'});
        return;
    }
    try{
        let respuesta = await ordenModel.buscarOrdenFecha(fechaInicio, fechaFin);
        console.log("respuesta", respuesta);
        if (!respuesta) {
            res.status(401).send({ "codigo": "-1", "mensaje": "Se ha producido un error" });
        } else {
            res.status(200).send({
                "codigo": "1",
                "mensaje": "Lista de ordenes",
                "data": respuesta
            });
        }
    } catch(ex){
        console.log("Se ha presentado un error");
        res.status(500).send({ "codigo": "-1", "mensaje": 'Se ha presentado un error, intente nuevamente'});
    }
}

export async function editarOrden(req: Request, res: Response){
    const datosOrden = req.body;
    const numOrden = req.params.numOrden;
    if(!datosOrden){
        res.status(400).send({ "codigo": "-1", "mensaje": 'Parametros incompletos'});
        return;
    }
    try{
        let respuesta = await ordenModel.registrarOrden(datosOrden, numOrden);
        if (respuesta[0]?.Mensaje !== 'Orden creada exitosamente' && respuesta[0]?.Mensaje !== 'Información actualizada') {
            res.status(400).send({ "codigo": "-1", "mensaje": respuesta[0].Mensaje });
        } else {
            res.status(200).send({
                "codigo": "1",
                "mensaje": respuesta[0].Mensaje
            });
        }
    } catch(ex){
        console.log("Se ha presentado un error");
        res.status(500).send({ "codigo": "-1", "mensaje": 'Se ha presentado un error, intente nuevamente'});
    }
}