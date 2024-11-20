import { Request, Response } from "express";
const importarDatosModel = require('../models/importarDatos.model');

export async function importar(req: Request, res:Response){
    const {listaDatos, usuarioId, numOS} = req.body
    if(!listaDatos || !usuarioId || !numOS){
        res.status(400).send({ "codigo": "-1", "mensaje": 'Parametros incompletos'});
        return;
    }
    try{
        let stringDatos = "";
        let tamDatos = Object.keys(listaDatos).length;

        for(let i=0;i<tamDatos;i++){
            stringDatos += "('" + listaDatos[i].join("','") + "'),";
        }
        stringDatos = stringDatos.slice(0, -1);
        let respuesta = await importarDatosModel.importar(usuarioId, numOS, stringDatos);
        if (respuesta[0]?.Mensaje !== 'Información actualizada' && respuesta[0]?.Mensaje !== 'Usuario creado exitosamente') {
            res.status(400).send({ "codigo": "-1", "mensaje": respuesta[0].Mensaje });
        } else {
            res.status(200).send({
                "codigo": "1",
                "mensaje": respuesta[0].Mensaje
            });
        }
    } catch(ex){
        console.log("Se ha presentado un error: ", ex);
        res.status(500).send({ "codigo": "-1", "mensaje": 'Se ha presentado un error, intente nuevamente'});
    }
}