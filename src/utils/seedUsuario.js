const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

/**
 * Crea un usuario administrador si no existe (solo desarrollo / demo).
 * Credenciales desde .env: ADMIN_EMAIL, ADMIN_PASSWORD
 */
async function seedUsuarioAdmin() {
  const email = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const plain = process.env.ADMIN_PASSWORD;

  if (!email || !plain) {
    console.log(
      '[seed] Omitido: define ADMIN_EMAIL y ADMIN_PASSWORD en .env para crear usuario demo.'
    );
    return;
  }

  const existe = await Usuario.findOne({ where: { email } });
  if (existe) {
    console.log('[seed] Usuario admin ya existe:', email);
    return;
  }

  const hash = await bcrypt.hash(plain, 10);
  await Usuario.create({
    email,
    password: hash,
    rol: 'admin',
  });

  console.log('[seed] Usuario administrador creado:', email);
}

module.exports = { seedUsuarioAdmin };
