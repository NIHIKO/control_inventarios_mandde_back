import { Request, Response } from "express";
import * as tokenService from '../services/token.service';
const usuarioModel = require('../models/usuario.model');


export async function iniciarSesion(req: Request, res: Response) {
    const { usuario, clave } = req.body;
    let respuesta = await usuarioModel.logueaUsuario(usuario, clave);
    if (respuesta[0].Mensaje) {
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
