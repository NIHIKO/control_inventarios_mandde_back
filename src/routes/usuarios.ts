import express from 'express';
import * as usuariosController from '../controllers/usuarios.controller';
import * as middlewares from '../middlewares/token.middleware';

const router = express.Router();

router.get('/usuarios', middlewares.verificarToken, usuariosController.listarUsuarios);
router.get('/usuarios/:id(\\d+)', middlewares.verificarToken, usuariosController.buscarUsuario);
router.get('/usuarios/:nombre', middlewares.verificarToken, usuariosController.buscarUsuario);

export default router;