# Sistema CRUD de Cursos de Maestría

Backend REST para la **Actividad 4 — Grupo 4**: gestión de cursos o módulos de un programa de maestría, con Express, MySQL, Sequelize, CORS, **JWT** (login y rutas protegidas) y variables de entorno, alineado al material de arquitectura CRUD y JWT del curso.

## Integrantes

- Iván Zambrano  
- Christian Alcívar  

## Tecnologías

| Librería   | Uso                                      |
|-----------|-------------------------------------------|
| Express   | Servidor HTTP y rutas REST                |
| mysql2    | Driver MySQL para Sequelize               |
| Sequelize | Modelo ORM y acceso a datos               |
| jsonwebtoken | Autenticación JWT (HS256)              |
| bcryptjs  | Hash de contraseñas de usuarios           |
| cors      | Permitir peticiones desde otros orígenes  |
| dotenv    | Configuración desde archivo `.env`        |
| nodemon   | Reinicio automático en desarrollo (dev)   |

## Estructura del proyecto

```
tarea-grupo4-cursos/
├── src/
│   ├── config/db.js              # Conexión Sequelize
│   ├── config/jwt.js             # Parámetros JWT (secreto, expiración)
│   ├── controllers/              # Cursos + auth (login)
│   ├── middleware/               # JWT, asyncHandler, validarIdParam, errorHandler
│   ├── models/Curso.js           # Modelo cursos
│   ├── models/Usuario.js         # Usuarios para login JWT
│   ├── routes/cursoRoutes.js     # /api/cursos
│   ├── routes/auth.routes.js     # /api/auth/login
│   ├── utils/cursoValidacion.js  # Validación de payload de curso
│   ├── utils/seedUsuario.js      # Usuario admin demo (opcional)
│   ├── app.js                    # Express, 404 y manejo de errores
│   └── server.js                 # Arranque, sync y seed
├── sql/cursos.sql
├── sql/usuarios.sql              # Tabla usuarios (JWT)
├── .env.example                          
└── package.json
```

## Instalación

```bash
cd tarea-grupo4-cursos
npm install
```

Copia `.env.example` a `.env` y completa: base de datos (`daw_grupo4`), **`JWT_SECRET`** (secreto largo, mínimo ~32 caracteres) y, si quieres usuario demo, **`ADMIN_EMAIL`** y **`ADMIN_PASSWORD`**.

## Ejecución

```bash
npm run dev
```

o en producción:

```bash
npm start
```

Si la conexión es correcta verás mensajes similares a:

- `Conexion a MySQL establecida correctamente`
- `Modelos sincronizados correctamente`
- `Servidor ejecutandose en http://localhost:3000`

## Autenticación JWT

1. `POST /api/auth/login` con `{ "email", "password" }` → recibes `data.token`.
2. En **Postman** o Thunder Client, pestaña **Authorization → Bearer Token**, o cabecera manual:  
   `Authorization: Bearer <token>`
3. **POST / PUT / DELETE** de cursos **requieren** ese token. Los **GET** de cursos son **públicos** (como en el análisis CRUD de referencia: lectura sin token, escritura protegida).

## Endpoints

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/` | No | Estado de la API |
| POST | `/api/auth/login` | No | Login; devuelve JWT |
| GET | `/api/cursos` | No | Listar cursos |
| GET | `/api/cursos/:id` | No | Consultar por ID |
| POST | `/api/cursos` | **Sí (Bearer)** | Crear curso |
| PUT | `/api/cursos/:id` | **Sí (Bearer)** | Actualizar curso |
| DELETE | `/api/cursos/:id` | **Sí (Bearer)** | Eliminar curso |

## Códigos HTTP

- **200**: consulta, actualización o eliminación exitosa  
- **201**: recurso creado  
- **400**: datos inválidos o incompletos  
- **401**: sin token, token inválido o expirado (rutas protegidas)  
- **404**: curso no encontrado  
- **500**: error interno del servidor  

## Ejemplo login

```json
{ "email": "admin@espam.edu", "password": "LaMismaClaveQueADMIN_PASSWORD" }
```

## Ejemplo POST curso (con Bearer token)

```json
{
  "nombre": "Arquitectura de Software",
  "descripcion": "Curso orientado al diseno de sistemas escalables y mantenibles",
  "docente": "Dr. Juan Perez",
  "creditos": 4,
  "horas": 64,
  "modalidad": "Virtual"
}
```

**Modalidades válidas:** `Presencial`, `Virtual`, `Hibrida`.

