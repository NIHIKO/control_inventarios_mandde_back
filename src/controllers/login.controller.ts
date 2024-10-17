import { Request, Response } from "express";
import * as tokenService from '../services/token.service';
const usuarioModel = require('../models/usuario.model');


export async function iniciarSesion(req: Request, res: Response){
    const { usuario, clave } = req.body;
    let respuesta = await usuarioModel.buscarUsuario(usuario, clave);
    if(respuesta){
        const token = tokenService.generarToken(respuesta);
        res.status(200)
            .send({
                    "codigo": "1",
                    "mensaje": "usuario encontrado",
                    "token": token,
                    "data": respuesta
                });
    } else{
        res.status(404).send({"codigo": "-1","mensaje":"usuario no encontrado"});
    }
}
