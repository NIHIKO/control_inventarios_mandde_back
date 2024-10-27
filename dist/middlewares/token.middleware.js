"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarToken = verificarToken;
const tokenService = __importStar(require("../services/token.service"));
function verificarToken(req, res, next) {
    const tokenPeticion = req.headers['authorization'];
    if (!tokenPeticion) {
        res
            .status(403)
            .send({ "mensaje": "Acceso no autorizado" });
    }
    else {
        const arrayToken = tokenPeticion.split(' ');
        if (arrayToken[0] !== 'Bearer') {
            res
                .status(403)
                .send({ "mensaje": "Acceso no autorizado" });
        }
        else {
            const tokenValido = tokenService.validarToken(arrayToken[1]);
            if (!tokenValido) {
                res
                    .status(401)
                    .send({ "mensaje": "Acceso no autorizado" });
            }
            else {
                const nuevoToken = tokenService.renovarToken(arrayToken[1]);
                res
                    .status(200)
                    .header({ 'Authorization': `Bearer ${nuevoToken}` })
                    .send(tokenValido);
            }
        }
    }
}
