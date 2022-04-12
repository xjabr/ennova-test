import Joi from 'joi';

export const joiUuid = Joi.string().empty().allow(null).allow("").min(0).regex(/^[0-9a-fA-F]{24}$/)
export const schemes = {
	login: Joi.object({
		email: Joi.string().min(0).required(),
		password: Joi.string().min(0).required()
	}),

	signup: Joi.object({
		firstName: Joi.string().min(0).required(),
		lastName: Joi.string().min(0).required(),
		email: Joi.string().min(0).required(),
		password: Joi.string().min(0).required()
	}),

	collectible: Joi.object({
		title: Joi.string().required(),
		description: Joi.string().allow("").allow(null).optional(),
		startPrice: Joi.number().required(),
		dateEnd: Joi.date().required()
	})
};