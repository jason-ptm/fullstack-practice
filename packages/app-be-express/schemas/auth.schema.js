const Joi = require("joi");

const password = Joi.string().max(30).label("contraseña").required();
const id = Joi.string().label("id").guid().required();

const loginSchema = Joi.object({
  email: Joi.string().email().required().label("correo electrónico"),
  password,
});

const changePasswordSchema = Joi.object({
  password,
  ownerId: id,
});

module.exports = { loginSchema, changePasswordSchema };
