const { Sequelize } = require('sequelize');

/**
 * Manejo centralizado: Sequelize, JSON inválido y errores inesperados.
 */
function errorHandler(err, req, res, _next) {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      ok: false,
      mensaje: 'El cuerpo de la peticion no es JSON valido',
    });
  }

  if (err instanceof Sequelize.ValidationError) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Error de validacion en la base de datos',
      errores: err.errors.map((e) => e.message),
    });
  }

  if (err instanceof Sequelize.DatabaseError) {
    return res.status(500).json({
      ok: false,
      mensaje: 'Error en la base de datos',
      ...(process.env.NODE_ENV === 'development' && { detalle: err.message }),
    });
  }

  console.error('[error]', err);
  const status =
    typeof err.status === 'number' && err.status >= 400 && err.status < 600
      ? err.status
      : 500;
  return res.status(status).json({
    ok: false,
    mensaje: err.publicMessage || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { error: err.message }),
  });
}

module.exports = errorHandler;
