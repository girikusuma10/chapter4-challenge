import {Sequelize} from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '',
  port: 3306,
  database: 'binar_cars',
  pool: {
    min: 0,
    max: 3,
  },
  logging: false,
});


export default sequelize;
