const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/jwt');

/**
 * Verifica JWT en Authorization: Bearer <token> (material de aula).
 * Inyecta payload en req.user.
 */
function autenticar(req, res, next) {
  try {
    if (!JWT_SECRET) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Servidor sin JWT_SECRET configurado',
      });
    }

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        ok: false,
        mensaje: 'Sin token de autenticacion',
      });
    }

    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      return res.status(401).json({
        ok: false,
        mensaje: 'Formato de token invalido. Use: Authorization: Bearer <token>',
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET, {
      algorithms: ['HS256'],
    });

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      mensaje: 'Token invalido o expirado',
      ...(process.env.NODE_ENV === 'development' && { detalle: error.message }),
    });
  }
}

module.exports = { autenticar };
