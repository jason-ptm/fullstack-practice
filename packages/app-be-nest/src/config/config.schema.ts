import * as Joi from "joi";

const configSchema = Joi.object({
	PORT: Joi.number().required(),
	DB_HOST: Joi.string().required(),
	DB_PORT: Joi.number().required(),
	DB_NAME: Joi.string().required(),
	DB_PASSWORD: Joi.string().required(),
	DB_USER: Joi.string().required(),
});

export default configSchema;
