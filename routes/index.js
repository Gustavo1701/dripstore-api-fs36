import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { categoriaController } from '../controllers/categoria.controller.js';
import { loginController } from '../controllers/login/login.controller.js';
import { produtoController } from '../controllers/produto.controller.js';
import { usuarioController } from '../controllers/usuarios.controller.js'
import { swaggerOptions } from '../config/swagger/swagger.config.js';


const swaggerSpec = swaggerJsdoc(swaggerOptions);

const routes = (app) => {
    
app.get('/', (req, res) => {
    res.send('Olá Mundo!')
  })
  
  produtoController(app)
  categoriaController(app)
  usuarioController(app)
  loginController(app)

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

export default routes;