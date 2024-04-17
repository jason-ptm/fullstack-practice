const Joi = require("joi");

const id = Joi.string().label("id").guid();
const fullName = Joi.string().label("nombre").max(50);
const email = Joi.string().label("correo electrónico").email();
const password = Joi.string().label("contraseña").max(30);
const age = Joi.number().positive().label("edad").max(150);

const getUserSchema = Joi.object({
  id: id.required(),
});

const createUserSchema = Joi.object({
  fullName: fullName.required(),
  age: age.required(),
  account: Joi.object({
    email: email.required(),
    password: password.required(),
  }).required(),
});

const updateUserSchema = Joi.object({
  data: Joi.object({
    fullName,
    age,
  }).required(),
  ownerId: id.required(),
});

module.exports = { getUserSchema, createUserSchema, updateUserSchema };
