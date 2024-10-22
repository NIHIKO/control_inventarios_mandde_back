require('dotenv').config();
const jwt = require('jsonwebtoken');

export function generarToken(usuario: object){
    console.log(usuario)
    return jwt.sign(usuario, 'ppmManddeSecret216!!..', {expiresIn: '60m'}); //TODO: .env include secret
}

export function validarToken(token: string){
    return jwt.verify(token, 'ppmManddeSecret216!!..', (error: object, usuario: object) => { //TODO: .env include secret
        return error || usuario;
    });
}

export function renovarToken(token: string) {
    try {
        const usuario = jwt.verify(token, 'ppmManddeSecret216!!..'); //TODO: .env include secret
        delete usuario.iat;
        delete usuario.exp;
        return generarToken(usuario);
    } catch (error) {
        console.error('Error al renovar el token:', error);
        return null;
    }
}