const express = require('express');
const asyncHandler = require('../middleware/asyncHandler');
const validarIdParam = require('../middleware/validarIdParam');
const { autenticar } = require('../middleware/auth.middleware');

const {
  listarCursos,
  obtenerCursoPorId,
  crearCurso,
  actualizarCurso,
  eliminarCurso,
} = require('../controllers/cursoController');

const router = express.Router();

/** Lectura publica (como en el analisis CRUD de referencia: GET sin token) */
router.get('/cursos', asyncHandler(listarCursos));
router.get('/cursos/:id', validarIdParam, asyncHandler(obtenerCursoPorId));

/** Escritura protegida con JWT (Bearer) */
router.post('/cursos', autenticar, asyncHandler(crearCurso));
router.put('/cursos/:id', autenticar, validarIdParam, asyncHandler(actualizarCurso));
router.delete('/cursos/:id', autenticar, validarIdParam, asyncHandler(eliminarCurso));

module.exports = router;
