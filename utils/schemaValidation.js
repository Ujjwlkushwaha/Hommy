const Joi = require("joi");

module.exports.schemaValidation =  Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    img: Joi.string(),
    price: Joi.number().required().min(0),
    location: Joi.string().required(),
    country: Joi.string().required()
  });


module.exports.reviewValidator = Joi.object({
    rating : Joi.number().required().min(1).max(5),
    comment : Joi.string().required()
});