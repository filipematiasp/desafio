const Joi = require('joi');

const searchSchema = Joi.object({
  checkin: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .messages({
      'string.pattern.base': '"checkin" deve estar no formato YYYY-MM-DD',
      'any.required': '"checkin" é obrigatório'
    }),
  checkout: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .messages({
      'string.pattern.base': '"checkout" deve estar no formato YYYY-MM-DD',
      'any.required': '"checkout" é obrigatório'
    }),
})

function validateSeachDates(req, res, next) {
  const { error } = searchSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}

module.exports = {
  validateSeachDates
}