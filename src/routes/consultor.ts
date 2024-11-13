import express from 'express';
import * as consultorController from '../controllers/consultor.controller';
import * as middlewares from '../middlewares/token.middleware';

const router = express.Router();

router.get('/consultor/filtros', middlewares.verificarToken, consultorController.listarFiltros);
router.post('/consultor/detallado', middlewares.verificarToken, consultorController.detallado);
router.post('/consultor/general', middlewares.verificarToken, consultorController.general);

export default router;