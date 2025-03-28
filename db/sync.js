import Categoria from "../models/categoria.model.js";
import Papel from "../models/papel.model.js";
import { inserirCategories } from "../services/categoria.services.js";
import sequelize from "./index.js";

export const iniciarBanco = async () => {
  try {
    // Conecta ao banco de dados
    await sequelize.authenticate();
    console.log('[OK] ✅ Conexão com o Banco de Dados estabelecida com sucesso');

    // Sincroniza as tabelas com o banco de dados (alterando, sem perder dador)
    await sequelize.sync({ force: true, alter: false }); // ⚠️ Isso apaga e recria as tabelas! Use `alter: true` para atualizar sem perder dados
    console.log('✅ Banco de dados sincronizado!');

    // Verifica se a tabela de categorias tem dados, se não tiver, ensere as categorias
    const categoriaCount = await Categoria.count();
    if (categoriaCount === 0) {
      console.log('Banco vazio, inserindo categoria...');
      await inserirCategories(); //Chama a função de inserção de categorias
      await insertPapeis(); // Chama a função de inserção de papeis      
    } else {
      console.log('Banco já contém dados, não é necessário inserir categorias.');
    }
  } catch (error) {
    console.error('❌ Erro ao sincronizar banco:', error);
  }
};

export const insertPapeis = async () => {
  try {
    const papeis = [
      { codigo: 1, nome: 'Usuário', codigo: 'USUARIO' },
      { codigo: 2, nome: 'Administrador', codigo: 'ADMIN' },
      { codigo: 2, nome: 'Moderador', codigo: 'MODERADOR' }
    ];

    for (let papel of papeis) {
      const existePapel = await Papel.findOne({ where: { codigo: papel.codigo } });
      if (!existePapel) {
        //Se o papel não existe, insere no banco
        await Papel.create(papel);
        console.log(`Papel '${papel.nome}' inserida com sucesso.`);
      } else {
        console.log(`Papel '${papel.nome}' já existe. Ignorando inserção.`);
      }
    }
  } catch (error) {
    console.error('Erro ao inserir pastéis:', error);
  }
}
