const Curso = require('../models/Curso');
const { validarCursoCompleto } = require('../utils/cursoValidacion');

const listarCursos = async (req, res) => {
  const cursos = await Curso.findAll({
    order: [['id', 'ASC']],
  });

  return res.status(200).json({
    ok: true,
    mensaje: 'Cursos listados correctamente',
    data: cursos,
  });
};

const obtenerCursoPorId = async (req, res) => {
  const curso = await Curso.findByPk(req.cursoId);

  if (!curso) {
    return res.status(404).json({
      ok: false,
      mensaje: 'Curso no encontrado',
    });
  }

  return res.status(200).json({
    ok: true,
    mensaje: 'Curso encontrado',
    data: curso,
  });
};

const crearCurso = async (req, res) => {
  const resultado = validarCursoCompleto(req.body);
  if (!resultado.ok) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Datos invalidos',
      errores: resultado.errores,
    });
  }

  const nuevoCurso = await Curso.create(resultado.datos);

  return res.status(201).json({
    ok: true,
    mensaje: 'Curso registrado correctamente',
    data: nuevoCurso,
  });
};

const actualizarCurso = async (req, res) => {
  const curso = await Curso.findByPk(req.cursoId);

  if (!curso) {
    return res.status(404).json({
      ok: false,
      mensaje: 'Curso no encontrado',
    });
  }

  const resultado = validarCursoCompleto(req.body);
  if (!resultado.ok) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Datos invalidos',
      errores: resultado.errores,
    });
  }

  await curso.update(resultado.datos);
  await curso.reload();

  return res.status(200).json({
    ok: true,
    mensaje: 'Curso actualizado correctamente',
    data: curso,
  });
};

const eliminarCurso = async (req, res) => {
  const curso = await Curso.findByPk(req.cursoId);

  if (!curso) {
    return res.status(404).json({
      ok: false,
      mensaje: 'Curso no encontrado',
    });
  }

  const eliminado = curso.toJSON();
  await curso.destroy();

  return res.status(200).json({
    ok: true,
    mensaje: 'Curso eliminado correctamente',
    data: eliminado,
  });
};

module.exports = {
  listarCursos,
  obtenerCursoPorId,
  crearCurso,
  actualizarCurso,
  eliminarCurso,
};
