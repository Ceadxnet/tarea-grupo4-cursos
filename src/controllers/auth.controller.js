const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/jwt');

/**
 * Login: valida credenciales y devuelve JWT (fundamentos JWT + ejemplo práctico).
 */
const login = async (req, res) => {
  try {
    if (!JWT_SECRET) {
      return res.status(500).json({
        ok: false,
        mensaje: 'JWT_SECRET no configurado en el servidor',
      });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Email y contraseña son obligatorios',
      });
    }

    const usuario = await Usuario.findOne({
      where: { email: String(email).trim().toLowerCase() },
    });

    if (!usuario) {
      return res.status(401).json({
        ok: false,
        mensaje: 'Credenciales invalidas',
      });
    }

    const valido = await bcrypt.compare(password, usuario.password);
    if (!valido) {
      return res.status(401).json({
        ok: false,
        mensaje: 'Credenciales invalidas',
      });
    }

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
      algorithm: 'HS256',
    });

    return res.status(200).json({
      ok: true,
      mensaje: 'Sesion iniciada correctamente',
      data: {
        token,
        expiresIn: JWT_EXPIRES_IN,
        usuario: {
          id: usuario.id,
          email: usuario.email,
          rol: usuario.rol,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: 'Error al iniciar sesion',
      ...(process.env.NODE_ENV === 'development' && { error: error.message }),
    });
  }
};

module.exports = { login };
