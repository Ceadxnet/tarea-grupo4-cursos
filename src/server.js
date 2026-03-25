require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/db');
const { assertJwtSecret } = require('./config/jwt');
const { seedUsuarioAdmin } = require('./utils/seedUsuario');

require('./models/Curso');
require('./models/Usuario');

const PORT = Number(process.env.PORT) || 3000;

const iniciarServidor = async () => {
  try {
    assertJwtSecret();

    await sequelize.authenticate();
    console.log('Conexion a MySQL establecida correctamente');

    await sequelize.sync();
    console.log('Modelos sincronizados correctamente');

    await seedUsuarioAdmin();

    const server = app.listen(PORT, () => {
      console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(
          `No se pudo iniciar: el puerto ${PORT} ya esta en uso. Cierra la otra terminal o cambia PORT en .env.`
        );
      } else {
        console.error('Error en el servidor HTTP:', err.message);
      }
      process.exit(1);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error.message);
    process.exit(1);
  }
};

iniciarServidor();
