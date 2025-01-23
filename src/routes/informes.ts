import express from 'express';
import * as informesController from '../controllers/informes.controller';
import * as middlewares from '../middlewares/token.middleware';

const router = express.Router();

router.get('/informes/listado', middlewares.verificarToken, informesController.listarInformes);
router.post('/informes/generar', middlewares.verificarToken, informesController.generarInforme);

export default router;