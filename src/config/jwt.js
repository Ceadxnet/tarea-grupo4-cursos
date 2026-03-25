/**
 * Configuración JWT alineada con buenas prácticas (HS256, secreto en .env).
 */
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

function assertJwtSecret() {
  if (!JWT_SECRET || JWT_SECRET.length < 32) {
    console.warn(
      '[jwt] JWT_SECRET no está definido o es demasiado corto (mínimo recomendado 32 caracteres). ' +
        'Define JWT_SECRET en .env antes de usar login o rutas protegidas.'
    );
  }
}

module.exports = {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  assertJwtSecret,
};
