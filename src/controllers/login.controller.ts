import { Request, Response } from "express";
import * as tokenService from '../services/token.service';
const usuarioModel = require('../models/usuario.model');

export async function iniciarSesion(req: Request, res: Response) {
    const { usuario, clave } = req.body;
    let respuesta = await usuarioModel.logueaUsuario(usuario, clave);
    try{
        if (respuesta.length == 0 || respuesta[0]?.Mensaje) {
            const mensaje = respuesta[0]?.Mensaje || 'Usuario no encontrado';
            res.status(401).send({ "codigo": "-1", "mensaje": mensaje });
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
    } catch(ex){
        console.log("Se presentó un error: " + ex);
        res.status(500).send({ "codigo": "-1", "mensaje": 'Se ha presentado un error, intente nuevamente'});
    }
}