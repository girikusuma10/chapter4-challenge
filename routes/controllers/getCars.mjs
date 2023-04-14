import cars from '../../models/cars.mjs';

export default {
  async getCarById(req, res) {
    try {
      const {id}= req.params;

      const carData= await cars.findByPk(id, {
        attributes: {
          exclude: ['deletedAt', 'createdAt', 'updatedAt', 'id', 'image'],
        },
      });

      if (!carData) {
        return res.NOT_FOUND('mobil');
      }

      return res.OK({
        car: carData,
      });
    } catch (error) {
      console.log(error);

      return res.INTERNAL_SERVER_ERROR();
    }
  },
  async getCars(req, res) {
    try {
      const carData= await cars.findAll({
        attributes: {
          exclude: ['deletedAt'],
        },
        order: [['id', 'DESC']],
      });

      return res.OK({
        cars: carData,
      });
    } catch (error) {
      return res.INTERNAL_SERVER_ERROR();
    }
  },
};
