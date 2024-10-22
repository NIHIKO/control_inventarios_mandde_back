require('dotenv').config();
const jwt = require('jsonwebtoken');

export function generarToken(usuario: object){
    return jwt.sign(usuario, process.env.SECRET, {expiresIn: '60m'});
}

export function validarToken(token: string){
    return jwt.verify(token, process.env.SECRET, (error: any, usuario: object) => {
        return (error)?false:usuario;
    });
}

export function renovarToken(token: string) {
    try {
        const usuario = jwt.verify(token, process.env.SECRET);
        delete usuario.iat;
        delete usuario.exp;
        return generarToken(usuario);
    } catch (error) {
        console.error('Error al renovar el token:', error);
        return null;
    }
}