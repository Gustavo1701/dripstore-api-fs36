import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';
import Papel from './papel.model.js';

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
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
    /* validate: {
      len: { args: [6, 10], msg: 'A senha deve ter entre 6 e 10 caracteres' },
      is: {
        args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,10}$/,
        msg: 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um caractere especial'
      }
    } */
  },
    /* telefone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'O telefone é obrigatório' }
    }
  }, */
}, {
  tableName: 'usuario',
  timestamps: true
});

//Relacionamento muitos para muitos de papel e usuario, criando a tabela usuario_papel
Usuario.belongsToMany(Papel, { through: "usuario_papel", as: "papel" });
Papel.belongsToMany(Usuario, { through: "usuario_papel" });

export default Usuario;
