const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Curso = sequelize.define(
  'Curso',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El nombre es obligatorio',
        },
        len: {
          args: [3, 150],
          msg: 'El nombre debe tener entre 3 y 150 caracteres',
        },
      },
    },
    descripcion: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'La descripcion es obligatoria',
        },
        len: {
          args: [5, 500],
          msg: 'La descripcion debe tener entre 5 y 500 caracteres',
        },
      },
    },
    docente: {
      type: DataTypes.STRING(120),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El docente es obligatorio',
        },
        len: {
          args: [3, 120],
          msg: 'El nombre del docente debe tener entre 3 y 120 caracteres',
        },
      },
    },
    creditos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'Los creditos deben ser un numero entero',
        },
        min: {
          args: [1],
          msg: 'Los creditos deben ser un numero positivo',
        },
      },
    },
    horas: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'Las horas deben ser un numero entero',
        },
        min: {
          args: [1],
          msg: 'Las horas deben ser un numero positivo',
        },
      },
    },
    modalidad: {
      type: DataTypes.ENUM('Presencial', 'Virtual', 'Hibrida'),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'La modalidad es obligatoria',
        },
        isIn: {
          args: [['Presencial', 'Virtual', 'Hibrida']],
          msg: 'La modalidad debe ser Presencial, Virtual o Hibrida',
        },
      },
    },
  },
  {
    tableName: 'cursos',
    timestamps: false,
  }
);

module.exports = Curso;
