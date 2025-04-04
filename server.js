import express from 'express';
import { iniciarBanco } from './db/sync.js';
import cors from 'cors';
import routes from './routes/index.js';


const app = express();
app.use(express.json());
app.use(cors())

const HOST = '127.0.0.1';
const PORT = 3000;

iniciarBanco()

routes(app)

app.listen(PORT, HOST, () => {
    console.log(`App de exemplo está rodando em http://${HOST}:${PORT}`);
  });