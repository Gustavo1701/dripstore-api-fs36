import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { HOST, PORT } from '../../server.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log('__dirname:', join(__dirname, '../controllers/*.js'));

export const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API DRIP-STORE_API',
            version: '1.0.0',
            description: 'Documenação da API de Produtos usando Swagger',
        },
        servers: [
            {
                url: `http://${HOST}:${PORT}`,
                description: 'Servidor de Desenvolvimento',
            },
        ],
    },

    apis: [join(__dirname, "../../controllers/**/**/*.js")],
};
