import * as usuarioModelo from '../models/usuario.model';
require('dotenv').config();
const jwt = require('jsonwebtoken');




export function generarToken(usuario: usuarioModelo.UsuarioModel){
    return jwt.sign(usuario, process.env.SECRET, {expiresIn: '60m'});
}

export function validarToken(token: string){
    return jwt.verify(token, process.env.SECRET, (error: object, usuario: object) => {
        return error?error:usuario;
    });
}

//TODO: Actualizar token en cada petición que se haga.
