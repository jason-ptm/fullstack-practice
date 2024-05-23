import Joi from "joi";

export const updateUserSchema = Joi.object({
	fullName: Joi.string().max(250).required(),
	age: Joi.number().integer().positive().required()
})