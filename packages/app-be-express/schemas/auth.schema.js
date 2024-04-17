const Joi = require("joi");

const email = Joi.string().email().label("correo electrónico");
const password = Joi.string().max(30).label("contraseña");
const id = Joi.string().label("id").guid().required();

const loginSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});

const updateAccountSchema = Joi.object({
  data: Joi.object({
    email,
    password,
  }).required(),
  ownerId: id,
});

module.exports = { loginSchema, updateAccountSchema };
