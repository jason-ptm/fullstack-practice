import Joi from 'joi';

export const schema = Joi.object({
  fullName: Joi.string().label('Nombre').max(30).required(),
  age: Joi.number().label('Edad').positive().max(120).required(),
  email: Joi.string()
    .label('Email')
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().label('Contraseña').required(),
});
