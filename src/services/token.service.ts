const config = require("../config/config.js");
const jwt = require('jsonwebtoken');

export function generarToken(usuario: object){
    return jwt.sign(usuario, config.secret, {expiresIn: '60m'});
}

export function validarToken(token: string){
    return jwt.verify(token, config.secret, (error: any, usuario: object) => {
        return (error)?false:usuario;
    });
}

export function renovarToken(token: string) {
    try {
        const usuario = jwt.verify(token, config.secret);
        delete usuario.iat;
        delete usuario.exp;
        return generarToken(usuario);
    } catch (error) {
        console.error('Error al renovar el token:', error);
        return null;
    }
}