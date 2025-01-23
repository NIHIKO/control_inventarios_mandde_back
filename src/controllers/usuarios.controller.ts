import { Request, Response } from "express";
import * as tokenService from '../services/token.service';
const usuarioModel = require('../models/usuario.model');
const utilerias = require('../utils/utilerias');

export async function iniciarSesion(req: Request, res: Response) {
    const { usuario, clave } = req.body;
    try{
        let respuesta = await usuarioModel.logueaUsuario(usuario, clave);
        if (respuesta[0]?.Mensaje) {
            res.status(403).send({ "codigo": "-1", "mensaje": respuesta[0].Mensaje });
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
        console.log("Se ha presentado un error");
        res.status(500).send({ "codigo": "-1", "mensaje": 'Se ha presentado un error, intente nuevamente'});
    }
}

export async function listarUsuarios(req: Request, res: Response){
    try{
        let respuesta = await usuarioModel.listarUsuarios();
        if (respuesta[0]?.Mensaje) {
            res.status(403).send({ "codigo": "-1", "mensaje": respuesta[0].Mensaje });
        } else {
            res.status(200).send({
                "codigo": "1",
                "mensaje": "lista de usuarios",
                "data": respuesta
            });
        }
    } catch(ex){
        console.log("Se ha presentado un error");
        res.status(500).send({ "codigo": "-1", "mensaje": 'Se ha presentado un error, intente nuevamente'});
    }
}

export async function buscarUsuario(req: Request, res: Response){
    const opcionBuscar = (req.params.id)?'Cosulta_IdUsuario':'Cosulta_NomUsuario';
    const valorBuscar = (req.params.id)?req.params.id:req.params.nombre;
    try{
        let respuesta = await usuarioModel.buscarUsuarios(opcionBuscar, valorBuscar);
        if (respuesta[0]?.Mensaje) {
            res.status(403).send({ "codigo": "-1", "mensaje": respuesta[0].Mensaje });
        } else {
            res.status(200).send({
                "codigo": "1",
                "mensaje": "lista de usuarios",
                "data": respuesta
            });
        }
    } catch(ex){
        console.log("Se ha presentado un error");
        res.status(500).send({ "codigo": "-1", "mensaje": 'Se ha presentado un error, intente nuevamente'});
    }
}

export async function cambiarClaveUsuario(req: Request, res: Response){
    const {id, nueva_clave} = req.body;
    if(!utilerias.esNumerico(id) || !nueva_clave){
        res.status(400).send({ "codigo": "-1", "mensaje": 'Parametros incompletos'});
        return;
    }
    try{
        let respuesta = await usuarioModel.cambiarClaveUsuario(id, nueva_clave);
        if (respuesta[0]?.Mensaje) {
            res.status(403).send({ "codigo": "-1", "mensaje": respuesta[0].Mensaje });
        } else {
            res.status(200).send({
                "codigo": "1",
                "mensaje": "datos del usuario",
                "data": respuesta
            });
        }
    } catch(ex){
        console.log("Se ha presentado un error");
        res.status(500).send({ "codigo": "-1", "mensaje": 'Se ha presentado un error, intente nuevamente'});
    }
}

export async function editarUsuario(req: Request, res: Response){
    const datosUsuario = req.body;
    const id = req.params.id;
    if(!datosUsuario){
        res.status(400).send({ "codigo": "-1", "mensaje": 'Parametros incompletos'});
        return;
    }
    try{
        let respuesta = await usuarioModel.registrarUsuario(datosUsuario, id);
        if (respuesta[0]?.Mensaje !== 'Información actualizada' && respuesta[0]?.Mensaje !== 'Usuario creado exitosamente') {
            res.status(403).send({ "codigo": "-1", "mensaje": respuesta[0].Mensaje });
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

