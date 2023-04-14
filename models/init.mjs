import cars from './cars.mjs';

export default async ()=> {
  await cars.sync({
    alter: true,
  });
};
