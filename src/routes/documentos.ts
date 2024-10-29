import express from 'express';
import * as middlewares from '../middlewares/token.middleware';
import * as documentosIdentidadController from '../controllers/documentos-identidad.controller';

const router = express.Router();

router.get('/documentos/tipo', middlewares.verificarToken, documentosIdentidadController.listarTiposDocumento);
router.post('/documentos/digito-verificacion', middlewares.verificarToken, documentosIdentidadController.calcularDigitoVerificacion);


export default router;