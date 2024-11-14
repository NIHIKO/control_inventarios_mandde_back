import { Request, Response } from "express";
import { Inventario } from "../models/inventario.model";
const inventarioModel = require('../models/inventario.model');

export async function consultarInventario(req: Request, res: Response){
    const { numOrden, codBarras } = req.body;
    if(!numOrden || !codBarras){
        res.status(400).send({ "codigo": "-1", "mensaje": 'Parametros incompletos'});
        return;
    }
    try{
        let respuesta = await inventarioModel.buscarInventario(codBarras, numOrden);
        if (!respuesta) {
            res.status(401).send({ "codigo": "-1", "mensaje": "Se ha producido un error" });
        } else {
            res.status(200).send({
                "codigo": "1",
                "mensaje": "datos de inventario",
                "data": respuesta
            });
        }
    } catch(ex){
        console.log("Se ha presentado un error");
        res.status(500).send({ "codigo": "-1", "mensaje": 'Se ha presentado un error, intente nuevamente'});
    }
}

export async function actualizarInventario(req: Request, res: Response){
    const elementoInventario: Inventario = {
        nro_documento: req.body.NroDocumento,
        cod_barra: req.body.CodBarra,
        cod_referencia: req.body.CodReferencia,
        c_movimiento: req.body.CMovimiento,
        cod_bodegas: req.body.CodBodegaS,
        talla: req.body.Talla,
        usuario: req.body.Usuario,
        num_os: req.body.NumOS
    };
    if(!inventarioModel.esValido(elementoInventario)){
        res.status(400).send({ "codigo": "-1", "mensaje": 'Parametros incompletos'});
        return;
    }
    try{
        const mensajesExito = ['Invetario procesado correctamente'];
        let respuesta = await inventarioModel.actualizarInventario(elementoInventario);
        if (!respuesta || !mensajesExito.includes(respuesta[0].Mensaje)) {
            res.status(400).send({ "codigo": "-1", "mensaje": respuesta[0].Mensaje });
        } else {
            res.status(200).send({
                "codigo": "1",
                "mensaje": respuesta[0].Mensaje,
            });
        }
    } catch(ex){
        console.log("Se ha presentado un error");
        res.status(500).send({ "codigo": "-1", "mensaje": 'Se ha presentado un error, intente nuevamente'});
    }
}