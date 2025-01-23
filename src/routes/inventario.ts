import express from 'express';
import * as inventarioController from '../controllers/inventario.controller';
import * as middlewares from '../middlewares/token.middleware';

const router = express.Router();

router.post('/inventario/buscar/', middlewares.verificarToken, inventarioController.consultarInventario);
router.put('/inventario/actualizar/', middlewares.verificarToken, inventarioController.actualizarInventario);
router.post('/inventario/procesado', middlewares.verificarToken, inventarioController.inventarioProcesado);

export default router;