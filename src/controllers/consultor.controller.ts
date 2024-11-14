import { Request, Response } from "express";
const consultorModel = require('../models/consultor.model');

export async function listarFiltros(req: Request, res: Response){
    try{
        let respuesta = await consultorModel.listarFiltros();
        if (!respuesta) {
            res.status(401).send({ "codigo": "-1", "mensaje": "Se ha producido un error" });
        } else {
            res.status(200).send({
                "codigo": "1",
                "mensaje": "lista de filtros",
                "data": respuesta
            });
        }
    } catch(ex){
        console.log("Se ha presentado un error");
        res.status(500).send({ "codigo": "-1", "mensaje": 'Se ha presentado un error, intente nuevamente'});
    }
}

export async function detallado(req: Request, res: Response){
    const { numOrden, codBarras } = req.body;
    if(!numOrden || !codBarras){
        res.status(400).send({ "codigo": "-1", "mensaje": 'Parametros incompletos'});
        return;
    }
    try{
        let respuesta = await consultorModel.consultorDetallado(codBarras, numOrden);
        if (!respuesta) {
            res.status(401).send({ "codigo": "-1", "mensaje": "Se ha producido un error" });
        } else {
            res.status(200).send({
                "codigo": "1",
                "mensaje": "datos de la consulta detalladada",
                "data": respuesta
            });
        }
    } catch(ex){
        console.log("Se ha presentado un error");
        res.status(500).send({ "codigo": "-1", "mensaje": 'Se ha presentado un error, intente nuevamente'});
    }
}

export async function general(req: Request, res: Response){
    const opcionesConFecha = [
        'CODIGO REFERENCIA','ESPECIAL1','FECHA CAPTURA'
    ];
    const { opcion, txtBusqueda, fechaInicio, fechaFin} = req.body;
    if(
        !opcion || !txtBusqueda ||
        (opcionesConFecha.includes(opcion) && (!fechaInicio || !fechaFin))
    ){
        res.status(400).send({ "codigo": "-1", "mensaje": 'Parametros incompletos'});
        return;
    }
    try{
        let respuesta = await consultorModel.consultorGeneral(opcion, txtBusqueda, fechaInicio, fechaFin);
        if (!respuesta) {
            res.status(401).send({ "codigo": "-1", "mensaje": "Se ha producido un error" });
        } else {
            res.status(200).send({
                "codigo": "1",
                "mensaje": "datos de la consulta general",
                "data": respuesta
            });
        }
    } catch(ex){
        console.log("Se ha presentado un error");
        res.status(500).send({ "codigo": "-1", "mensaje": 'Se ha presentado un error, intente nuevamente'});
    }
}
