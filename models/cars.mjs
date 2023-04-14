import {DataTypes} from 'sequelize';
import sequelize from '../helpers/sequelize.mjs';

const cars= sequelize.define('cars', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  perDayRentPrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  size: {
    type: DataTypes.ENUM,
    allowNull: false,
    defaultValue: 'small',
    values: ['small', 'medium', 'large'],
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

cars.sync();

export default cars;
