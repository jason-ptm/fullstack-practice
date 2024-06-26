import Joi from 'joi';

export const schema = Joi.object({
  email: Joi.string()
    .label('Email')
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().label('Contraseña').required(),
});
