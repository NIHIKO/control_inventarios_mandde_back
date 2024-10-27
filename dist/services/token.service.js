"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarToken = generarToken;
exports.validarToken = validarToken;
exports.renovarToken = renovarToken;
require('dotenv').config();
const jwt = require('jsonwebtoken');
function generarToken(usuario) {
    return jwt.sign(usuario, process.env.SECRET, { expiresIn: '60m' });
}
function validarToken(token) {
    return jwt.verify(token, process.env.SECRET, (error, usuario) => {
        return (error) ? false : usuario;
    });
}
function renovarToken(token) {
    try {
        const usuario = jwt.verify(token, process.env.SECRET);
        delete usuario.iat;
        delete usuario.exp;
        return generarToken(usuario);
    }
    catch (error) {
        console.error('Error al renovar el token:', error);
        return null;
    }
}
