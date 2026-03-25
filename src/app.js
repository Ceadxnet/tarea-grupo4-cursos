const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const cursoRoutes = require('./routes/cursoRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', cursoRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    ok: true,
    mensaje: 'API de cursos (CRUD + JWT). Lectura publica; alta/edicion/baja requieren Bearer token.',
    auth: 'POST /api/auth/login',
    cursos: 'GET /api/cursos (publico) | POST/PUT/DELETE (protegido)',
  });
});

app.use((req, res) => {
  res.status(404).json({
    ok: false,
    mensaje: 'Ruta no encontrada',
  });
});

app.use(errorHandler);

module.exports = app;
