import Categoria from "../models/categoria.model.js";

const categoriaService = {
  // Método para buscar todas as categorias
  async getAll(req, res) {
    try {
      const categorias = await Categoria.findAll();
      res.status(200).json(categorias);
    } catch (error) {
      console.error('[ERRO]:', error);
      res.status(500).json({ mensagem: `Erro ao buscar categorias: ${error}` });
    }
  },

  // Método para buscar uma categoria por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const categoria = await Categoria.findByPk(id);
      if (!categoria) {
        return res.status(404).json({ mensagem: 'Categoria não encontrada' });
      }
      res.status(200).json(categoria);
    } catch (error) {
      console.error('[ERRO]:', error);
      res.status(500).json({ mensagem: 'Erro ao buscar categoria' });
    }
  },

  // Método para criar uma nova categoria
  async create(req, res) {
    try {
      const { nome, codigo, descricao } = req.body;
      const novaCategoria = await Categoria.create({ nome, codigo, descricao });
      res.status(201).json(novaCategoria);
    } catch (error) {
      console.error('[ERRO]:', error);
      res.status(500).json({ mensagem: 'Erro ao criar categoria' });
    }
  },

  // Método para atualizar uma categoria
  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome } = req.body;

      const categoria = await Categoria.findByPk(id);
      if (!categoria) {
        return res.status(404).json({ mensagem: 'Categoria não encontrada' });
      }

      await categoria.update({ nome });
      res.status(200).json(categoria);
    } catch (error) {
      console.error('[ERRO]:', error);
      res.status(500).json({ mensagem: 'Erro ao atualizar categoria' });
    }
  },

  // Método para deletar uma categoria
  async delete(req, res) {
    try {
      const { id } = req.params;
      const categoria = await Categoria.findByPk(id);

      if (!categoria) {
        return res.status(404).json({ mensagem: 'Categoria não encontrada' });
      }

      await categoria.destroy();
      res.status(204).send();
    } catch (error) {
      console.error('[ERRO]:', error);
      res.status(500).json({ mensagem: 'Erro ao excluir categoria' });
    }
  }
};

export const inserirCategories = async () => {
  try {
    const categories = [
      { nome: 'Tênis Esportivo', codigo: '1001', descricao: 'Tênis para prática de esportes e atividades físicas' },
      { nome: 'Tênis Casual', codigo: '1002', descricao: 'Tênis para uso casual e cotidiano' },
      { nome: 'Tênis de Corrida', codigo: '1003', descricao: 'Tênis projetado para corrida e performance' },
      { nome: 'Tênis Skate', codigo: '1004', descricao: 'Tênis resistente e confortável para skatistas' },
      { nome: 'Tênis Social', codigo: '1005', descricao: 'Tênis com design sofisticado para ocasiões formais' }
    ];

    for (let category of categories){
      const existingCategory = await Categoria.findOne({ where: { codigo: category.codigo } });
      if (!existingCategory){
        await Categoria.create(category);
        console.log(`Categoria '${category.nome}' inserida com sucesso.`);        
      } else {
        console.log(`Categoria '${category.nome}' já existe. Ignorando inserção.`);        
      }
    }
  } catch (error){
    console.error('Erro ao inserir categorias:', error);
  }
}

export default categoriaService;