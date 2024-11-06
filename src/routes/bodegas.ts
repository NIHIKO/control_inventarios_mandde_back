import express from 'express';
import * as middlewares from '../middlewares/token.middleware';
import * as bodegaController from '../controllers/bodega.controller';

const router = express.Router();

router.get('/bodegas/listar', middlewares.verificarToken, bodegaController.listarBodegas);

export default router;