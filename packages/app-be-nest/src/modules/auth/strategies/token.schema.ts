import * as Joi from "joi";

const tokenSchema = Joi.object({
	account: Joi.string().uuid().required(),
	user: Joi.string().uuid().required(),
});

export default tokenSchema;
