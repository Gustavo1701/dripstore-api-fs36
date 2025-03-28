import Papel from "../models/papel.model";


const papelServices = {
  // Método para buscar todos os usuários
  async getAll(req, res) {
    try {
      const papeis = await Papel.findAll();
      res.status(200).json(papeis);
    } catch (error) {
      console.error('[ERRO]:', error);
      res.status(500).json({ mensagem: `Erro ao buscar papel: ${error}` });
    }
  },

  // Método para criar um novo usuário
  async create(req, res) {
    try {
      const { nome, codigo} = req.body;
      const novoPapel = await Papel.create({ nome, codigo});
      res.status(201).json(novoPapel);
    } catch (error) {
      console.error('[ERRO]:', error);
      res.status(500).json({ mensagem: 'Erro ao criar papel' });
    }
  },

  // Método para atualizar um usuário
  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, codigo } = req.body;

      const papel = await Papel.findByPk(id);
      if (!papel) {
        return res.status(404).json({ mensagem: 'Papel não encontrado' });
      }

      await papel.update({ nome, codigo });
      res.status(200).json(papel);
    } catch (error) {
      console.error('[ERRO]:', error);
      res.status(500).json({ mensagem: 'Erro ao atualizar papel' });
    }
  },

  // Método para deletar um usuário
  async delete(req, res) {
    try {
      const { id } = req.params;
      const papel = await Papel.findByPk(id);

      if (!papel) {
        return res.status(404).json({ mensagem: 'Papel não encontrado' });
      }

      await papel.destroy();
      res.status(204).send();
    } catch (error) {
      console.error('[ERRO]:', error);
      res.status(500).json({ mensagem: 'Erro ao excluir Papel' });
    }
  }
};

export default papelServices;
