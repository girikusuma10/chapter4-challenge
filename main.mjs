import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes/routes.mjs';
import initModel from './models/init.mjs';
import './helpers/response.mjs';


const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use('/images', express.static('uploads'));
app.use('/', express.static('public'));

routes(app);

initModel();

app.listen(3000, () => {
  console.log(`app started in http://localhost:3000`);
});
