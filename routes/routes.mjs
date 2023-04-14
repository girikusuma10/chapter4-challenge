import addCar from './controllers/addCar.mjs';
import deleteCar from './controllers/deleteCar.mjs';
import getCars from './controllers/getCars.mjs';
import updateCar from './controllers/updateCar.mjs';
import path from 'path';
import {fileURLToPath} from 'url';

export default (route)=> {
  const __filename = fileURLToPath(import.meta.url);

  const __dirname = path.dirname(__filename);

  route.get('/cars', getCars.getCars);
  route.get('/cars/:id', getCars.getCarById);

  route.post('/cars', addCar);
  route.put('/cars/:id', updateCar);

  route.delete('/cars/:id', deleteCar);

  route.get('/', (req, res)=> {
    console.log('ok');

    return res.sendFile(path.join(__dirname, '../public/index.html'));
  });

  route.get('/addCar', (req, res)=> {
    return res.sendFile(path.join(__dirname, '../public/addCar.html'));
  });

  route.get('/editCar', (req, res)=> {
    return res.sendFile(path.join(__dirname, '../public/editCar.html'));
  });
};
