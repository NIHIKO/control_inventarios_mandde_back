import express from 'express';
import * as ciudadController from '../controllers/ciudad.controller';

const router = express.Router();

router.get('/ciudad/listar', ciudadController.listarCiudades);

export default router;