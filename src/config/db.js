const { Sequelize } = require('sequelize');
require('dotenv').config();

const required = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_HOST'];
const missing = required.filter((k) => !process.env[k]);
if (missing.length > 0) {
  console.warn(
    `[db] Faltan variables en .env: ${missing.join(', ')}. La conexion puede fallar.`
  );
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

module.exports = sequelize;
