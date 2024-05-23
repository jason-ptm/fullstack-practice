import Joi from 'joi';

export const schema = Joi.object({
  title: Joi.string().label('titulo').max(30).required(),
  content: Joi.string().label('contenido').max(250).required(),
});
