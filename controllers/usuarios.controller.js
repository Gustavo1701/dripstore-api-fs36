import express from 'express';
import usuariosServices from '../services/usuarios.services';

const router = express.Router();

export const usuarioController = (app) => {

    router.get('/usuarios', usuariosServices.getAll)   // Buscar todos os usuarios
        .get('/usuarios/:id', usuariosServices.getById)    // Buscar um categoria por ID
        .post('/usuarios', usuariosServices.create)        // Criar um categoria
        .put('/usuarios/:id', usuariosServices.update)     // Atualizar um categoria
        .delete('/usuarios/:id', usuariosServices.delete); // Excluir um categoria

    // Prefixo global "/api/categorias" para todas as rotas de categorias
    app.use('/api', router);
}

export default router;
