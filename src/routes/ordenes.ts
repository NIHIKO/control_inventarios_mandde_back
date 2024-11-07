import express from 'express';
import * as ordenesController from '../controllers/ordenes.controller';
import * as middlewares from '../middlewares/token.middleware';

const router = express.Router();

router.get('/ordenes/:num(\\d+)', middlewares.verificarToken, ordenesController.buscarOrden);
router.post('/ordenes/fecha', middlewares.verificarToken, ordenesController.buscarOrdenFecha);
router.post('/ordenes/nueva/', middlewares.verificarToken, ordenesController.editarOrden);
router.put('/ordenes/actualizar/:numOrden(\\d+)', middlewares.verificarToken, ordenesController.editarOrden);

export default router;