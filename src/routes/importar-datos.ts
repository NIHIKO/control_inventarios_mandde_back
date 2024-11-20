import express from 'express';
import * as middlewares from '../middlewares/token.middleware';
import * as importarDatosController from '../controllers/importarDatos.controller';

const router = express.Router();

router.put('/importar-datos/', middlewares.verificarToken, importarDatosController.importar);

export default router;