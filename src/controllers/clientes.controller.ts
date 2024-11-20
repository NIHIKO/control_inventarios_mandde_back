import { Request, Response } from "express";
const clienteModel = require('../models/cliente.model');

export async function listarClientes(req: Request, res: Response){
    const soloActivos = (req.path.search('/activos/') > -1);
    try{
        let respuesta = await clienteModel.listarClientes(soloActivos);
        if (!respuesta) {
            res.status(401).send({ "codigo": "-1", "mensaje": 'Se ha producido un error' });
        } else {
            res.status(200).send({
                "codigo": "1",
                "mensaje": "lista de clientes",
                "data": respuesta
            });
        }
    } catch(ex){
        console.log("Se ha presentado un error");
        res.status(500).send({ "codigo": "-1", "mensaje": 'Se ha presentado un error, intente nuevamente'});
    }
}

export async function buscarCliente(req: Request, res: Response){
    const opcionBuscar = (req.params.num)?'Consultar_NumCliente':'Consultar_NomCliente';
    const valorBuscar = (req.params.num)?req.params.num:req.params.nombre;
    try{
        let respuesta = await clienteModel.buscarCliente(opcionBuscar, valorBuscar);
        if (!respuesta) {
            res.status(401).send({ "codigo": "-1", "mensaje": "Se ha producido un error" });
        } else {
            res.status(200).send({
                "codigo": "1",
                "mensaje": "datos del cliente",
                "data": respuesta
            });
        }
    } catch(ex){
        console.log("Se ha presentado un error");
        res.status(500).send({ "codigo": "-1", "mensaje": 'Se ha presentado un error, intente nuevamente'});
    }
}

export async function editarCliente(req: Request, res: Response){
    const datosCliente = req.body;
    const id = req.params.id;

    if(!datosCliente){
        res.status(400).send({ "codigo": "-1", "mensaje": 'Parametros incompletos'});
        return;
    }
    try{
        let respuesta = await clienteModel.registrarCliente(datosCliente, id);
        if(respuesta[0]?.Estado){
            const codEstado = (respuesta[0]?.Estado == 'El NIT del cliente no existe')?404:400;
            res.status(codEstado).send({
                "codigo": "-1",
                "mensaje": respuesta[0]?.Estado
            });
        }

        else if (respuesta[0]?.Mensaje !== 'Información Insertada' && respuesta[0]?.Mensaje !== 'Información actualizada') {
            res.status(401).send({ "codigo": "-1", "mensaje": respuesta[0].Mensaje });
        } else {
            res.status(200).send({
                "codigo": "1",
                "mensaje": respuesta[0].Mensaje,
                "data": respuesta
            });
        }
    } catch(ex){
        console.log("Se ha presentado un error");
        res.status(500).send({ "codigo": "-1", "mensaje": 'Se ha presentado un error, intente nuevamente'});
    }
}

