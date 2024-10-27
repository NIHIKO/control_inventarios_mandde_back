import express from 'express';
import * as documentosIdentidadController from '../controllers/documentos-identidad.controller';

const router = express.Router();

router.get('/documentos/tipo', documentosIdentidadController.listarTiposDocumento);
router.post('/documentos/digito-verificacion', documentosIdentidadController.calcularDigitoVerificacion);


export default router;