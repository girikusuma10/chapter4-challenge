import cars from '../../models/cars.mjs';
import fs from 'fs-extra';

export default async (req, res)=> {
  try {
    const {id}= req.params;

    const findCar= await cars.findByPk(id);

    if (!findCar) {
      return res.NOT_FOUND('mobil');
    }

    const file= `uploads/${findCar.image}`;

    await findCar.destroy();

    if (await fs.exists(file)) {
      await fs.remove(file);
    }


    return res.OK({
      message: 'mobil berhasil dihapus',
    });
  } catch (error) {
    console.log(error);

    return res.INTERNAL_SERVER_ERROR();
  }
};
