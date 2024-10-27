import { Request, Response } from "express";
import * as tokenService from '../services/token.service';
const usuarioModel = require('../models/usuario.model');


export async function iniciarSesion(req: Request, res: Response) {
    const { usuario, clave } = req.body;
    let respuesta = await usuarioModel.logueaUsuario(usuario, clave);
    if (respuesta[0]?.Mensaje) {
        res.status(401).send({ "codigo": "-1", "mensaje": respuesta[0].Mensaje });
    } else {
        const idUsuarioString = { id_usuario: respuesta[0].Id_Usuario };
        const token = tokenService.generarToken(idUsuarioString);
        res.status(200)
            .set('Authorization', `Bearer ${token}`)
            .send({
                "codigo": "1",
                "mensaje": "usuario encontrado",
                "data": respuesta
            });
    }
}

export async function listarUsuarios(req: Request, res: Response){
    let respuesta = await usuarioModel.listarUsuarios();
    if (respuesta[0]?.Mensaje) {
        res.status(401).send({ "codigo": "-1", "mensaje": respuesta[0].Mensaje });
    } else {
        res.status(200).send({
            "codigo": "1",
            "mensaje": "lista de usuarios",
            "data": respuesta
        });
    }
}

export async function buscarUsuario(req: Request, res: Response){
    const opcionBuscar = (req.params.id)?'Cosulta_IdUsuario':'Cosulta_NomUsuario';
    const valorBuscar = (req.params.id)?req.params.id:req.params.nombre;
    let respuesta = await usuarioModel.buscarUsuarios(opcionBuscar, valorBuscar);
    if (respuesta[0]?.Mensaje) {
        res.status(401).send({ "codigo": "-1", "mensaje": respuesta[0].Mensaje });
    } else {
        res.status(200).send({
            "codigo": "1",
            "mensaje": "lista de usuarios",
            "data": respuesta
        });
    }
}