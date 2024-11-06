import express from 'express';
import * as perfilesController from '../controllers/perfiles.controller';
import * as middlewares from '../middlewares/token.middleware';

const router = express.Router();

router.get('/perfiles/usuario/:usuarioId(\\d+)', middlewares.verificarToken, perfilesController.buscarPerfil);
router.get('/perfiles/proyecto/:proyectoId(\\d+)', middlewares.verificarToken, perfilesController.buscarPerfil);

export default router;