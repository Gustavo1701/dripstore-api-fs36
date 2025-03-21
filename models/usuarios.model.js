import { Sequelize } from 'sequelize';
import sequelize from '../db/index.js';

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'O nome é obrigatório' }
    }
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: { msg: 'O CPF já está cadastrado' },
    validate: {
      notEmpty: { msg: 'O CPF é obrigatório' },
      len: { args: [11, 11], msg: 'O CPF deve ter exatamente 11 caracteres' }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: { msg: 'O e-mail já está cadastrado' },
    validate: {
      notEmpty: { msg: 'O e-mail é obrigatório' },
      isEmail: { msg: 'O e-mail deve ser válido' }
    }
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'O telefone é obrigatório' }
    }
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: { args: [6, 10], msg: 'A senha deve ter entre 6 e 10 caracteres' }
    }
  }
}, {
  tableName: 'usuarios', // Nome da tabela no banco
  timestamps: false // Define se quer usar createdAt e updatedAt
});

export default Usuario;
