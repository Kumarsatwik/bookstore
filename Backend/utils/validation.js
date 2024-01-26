const Joi = require("joi");

const bookSchema = Joi.object({
  title: Joi.string().required(),
  category: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  publication_year: Joi.date().required(),
  image: Joi.string(),
});

const registerSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

const validateBook = (payload) =>
  bookSchema.validate(payload, { abortEarly: false });

const validateRegister = (payload) =>
  registerSchema.validate(payload, { abortEarly: false });

const validateLogin = (payload) =>
  loginSchema.validate(payload, { abortEarly: false });

module.exports = {
  validateBook,
  validateRegister,
  validateLogin,
};
