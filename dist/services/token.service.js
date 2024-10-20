"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarToken = generarToken;
exports.validarToken = validarToken;
exports.renovarToken = renovarToken;
require('dotenv').config();
const jwt = require('jsonwebtoken');
function generarToken(usuario) {
    console.log(usuario);
    return jwt.sign(usuario, 'ppmManddeSecret216!!..', { expiresIn: '60m' });
}
function validarToken(token) {
    return jwt.verify(token, 'ppmManddeSecret216!!..', (error, usuario) => {
        return error || usuario;
    });
}
function renovarToken(token) {
    try {
        const usuario = jwt.verify(token, 'ppmManddeSecret216!!..');
        delete usuario.iat;
        delete usuario.exp;
        return generarToken(usuario);
    }
    catch (error) {
        console.error('Error al renovar el token:', error);
        return null;
    }
}
