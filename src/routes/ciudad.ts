import express from 'express';
import * as middlewares from '../middlewares/token.middleware';
import * as ciudadController from '../controllers/ciudad.controller';

const router = express.Router();

router.get('/ciudad/listar', middlewares.verificarToken,ciudadController.listarCiudades);

export default router;