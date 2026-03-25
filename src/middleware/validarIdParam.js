/**
 * Valida que :id sea un entero >= 1 y lo expone en req.cursoId.
 */
function validarIdParam(req, res, next) {
  const idNum = Number(req.params.id);
  if (!Number.isInteger(idNum) || idNum < 1) {
    return res.status(400).json({
      ok: false,
      mensaje: 'ID invalido',
    });
  }
  req.cursoId = idNum;
  next();
}

module.exports = validarIdParam;
