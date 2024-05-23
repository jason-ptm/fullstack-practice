import Joi from 'joi';

export const updateEmailSchema = Joi.object({
  email: Joi.string().email().required(),
  confirmEmail: Joi.ref('email'),
});

export const updatePasswordSchema = Joi.object({
  password: Joi.string().required(),
  confirmPassword: Joi.ref('password'),
});
