import { Sequelize } from 'sequelize';
import Categoria from './categoria.model.js';
import sequelize from '../db/index.js';

const Produto = sequelize.define('Produto', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false
  },
  descricao: {
    type: Sequelize.STRING,
    allowNull: false
  },
  avaliacao: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  tamanho: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  cor: {
    type: Sequelize.STRING,
    allowNull: false
  },
  preco: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  categoriaId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Categoria,
      key: 'id'
    }
  }
}, {
  tableName: 'produto',
  //timestamps: false
});

// Definir o relacionamento
Produto.belongsTo(Categoria, { foreignKey: 'categoriaId', as: 'categoria' });
Categoria.hasMany(Produto, { foreignKey: 'categoriaId', as: 'categoria'});

export default Produto;
