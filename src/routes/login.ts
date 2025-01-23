import express from 'express';
import * as loginController from '../controllers/login.controller';

const router = express.Router();

router.post('/iniciar_sesion', loginController.iniciarSesion);

export default router;