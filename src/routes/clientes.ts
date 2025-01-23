import express from 'express';
import * as clientesController from '../controllers/clientes.controller';
import * as middlewares from '../middlewares/token.middleware';

const router = express.Router();

router.get('/clientes/', middlewares.verificarToken, clientesController.listarClientes);
router.get('/clientes/activos/', middlewares.verificarToken, clientesController.listarClientes);
router.get('/clientes/:num(\\d+)', middlewares.verificarToken, clientesController.buscarCliente);
router.get('/clientes/:nombre', middlewares.verificarToken, clientesController.buscarCliente);
router.post('/clientes/nuevo/', middlewares.verificarToken, clientesController.editarCliente);
router.put('/clientes/actualizar/:id(\\d+)', middlewares.verificarToken, clientesController.editarCliente);

export default router;