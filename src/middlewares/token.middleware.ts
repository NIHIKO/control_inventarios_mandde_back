import { Request, Response, NextFunction } from "express";
import * as tokenService from '../services/token.service';

export function verificarToken(req: Request, res: Response, next: NextFunction){
    const tokenPeticion = req.headers['authorization'];
    if(!tokenPeticion){
        res
            .status(403)
            .send({"mensaje":"Acceso no autorizado"});
    } else{
        const arrayToken = tokenPeticion.split(' ');
        if(arrayToken[0] !== 'Bearer'){
            //Token mal formado
            res
                .status(403)
                .send({"mensaje":"Acceso no autorizado"});
        } else{
            const tokenValido = tokenService.validarToken(arrayToken[1]);
            if(tokenValido.name?.toLowerCase() === 'jsonwebtokenerror'){
                res
                    .status(401)
                    .send({"mensaje":"Acceso no autorizado"});
            } else{
                //TODO: Generar nuevo token
                const nuevoToken = tokenService.generarToken(tokenValido);
                res
                    .status(200)
                    .header({'token': nuevoToken})
                    .send(tokenValido);
            }
        }
    }
}