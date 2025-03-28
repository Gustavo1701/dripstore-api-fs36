import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../db/index.js';

const Papel = sequelize.define('Papel', {
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
    codigo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'O código já está cadastrado' },
        }
    }
}, {
    tableName: 'papel', // Nome da tabela no banco
    timestamps: false // Define se quer usar createdAt e updatedAt
});

export default Papel;
