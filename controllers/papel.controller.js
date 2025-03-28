import express from 'express';
import papelServices from '../services/papel.services'

const router = express.Router();

export const papelController = (app) => {

    router.get('/papel', papelServices.getAll)       // Buscar todos os papel
        .get('/papel/:id', papelServices.getById)    // Buscar um categoria por ID
        .post('/papel', papelServices.create)        // Criar um categoria
        .put('/papel/:id', papelServices.update)     // Atualizar um categoria
        .delete('/papel/:id', papelServices.delete); // Excluir um categoria

    // Prefixo global "/api/categorias" para todas as rotas de categorias
    app.use('/api', router);
}

export default router;
