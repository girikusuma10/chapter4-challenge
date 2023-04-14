import formidable from 'formidable';
import fs from 'fs-extra';
import * as nanoid from 'nanoid';
import * as yup from 'yup';
import cars from '../../models/cars.mjs';
import validateYup from '../../helpers/validateYup.mjs';

const validateRules= yup.object({
  name: yup.string().required(),
  size: yup.string().oneOf(['small', 'medium', 'large']).required(),
  perDayRentPrice: yup.number().required(),
  image: yup.string().required(),
});

export default (req, res)=> {
  const form= new formidable.IncomingForm();

  form.parse(req, async (err, fields, {image})=> {
    try {
      const {name, perDayRentPrice, size}= fields;

      const validateInput= await validateYup(validateRules, {
        ...fields,
        image: image?.originalFilename,
      });

      if (validateInput) {
        return res.BAD_REQUEST(validateInput);
      }

      const {id}= req.params;

      const findCar= await cars.findByPk(id);

      if (!findCar) {
        return res.NOT_FOUND('mobil');
      }

      const file= `uploads/${findCar.image}`;

      const extension= image.originalFilename.split('.').pop();
      const newFileName= `${nanoid.nanoid()}.${extension}`;

      await findCar.update({
        name,
        perDayRentPrice,
        size,
        image: newFileName,
      });

      if (await fs.exists(file)) {
        await fs.remove(file);
      }

      const oldFile= await fs.readFile(image.filepath);
      await fs.writeFile(
          `uploads/${newFileName}`,
          oldFile,
      );

      return res.OK({
        message: 'mobil berhasil diupdate',
      });
    } catch (error) {
      console.log(error);
      return res.INTERNAL_SERVER_ERROR();
    }
  });
};
