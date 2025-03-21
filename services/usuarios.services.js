import Usuario from "../models/usuarios.model.js";

const usuariosServices = {
  // Método para buscar todos os usuários
  async getAll(req, res) {
    try {
      const usuarios = await Usuario.findAll();
      res.status(200).json(usuarios);
    } catch (error) {
      console.error('[ERRO]:', error);
      res.status(500).json({ mensagem: `Erro ao buscar usuários: ${error}` });
    }
  },

  // Método para buscar um usuário por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
      }
      res.status(200).json(usuario);
    } catch (error) {
      console.error('[ERRO]:', error);
      res.status(500).json({ mensagem: 'Erro ao buscar usuário' });
    }
  },

  // Método para criar um novo usuário
  async create(req, res) {
    try {
      const { nome, email, cpf, senha, telefone } = req.body;
      const novoUsuario = await Usuario.create({ nome, email, cpf, senha, telefone });
      res.status(201).json(novoUsuario);
    } catch (error) {
      console.error('[ERRO]:', error);
      res.status(500).json({ mensagem: 'Erro ao criar usuário' });
    }
  },

  // Método para atualizar um usuário
  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, cpf, senha, telefone } = req.body;

      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
      }

      await usuario.update({ nome, email, cpf, senha, telefone });
      res.status(200).json(usuario);
    } catch (error) {
      console.error('[ERRO]:', error);
      res.status(500).json({ mensagem: 'Erro ao atualizar usuário' });
    }
  },

  // Método para deletar um usuário
  async delete(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
      }

      await usuario.destroy();
      res.status(204).send();
    } catch (error) {
      console.error('[ERRO]:', error);
      res.status(500).json({ mensagem: 'Erro ao excluir usuário' });
    }
  }
};

export default usuariosServices;
