const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().email().required().label("correo electrónico"),
  password: Joi.string().max(30).label("contraseña").required(),
});

module.exports = { loginSchema };
