export default async (rules, fields)=> {
  try {
    await rules.validate(fields, {
      abortEarly: false,
    });
    return null;
  } catch (error) {
    return error.errors;
  }
};
