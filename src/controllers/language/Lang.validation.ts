import Joi from 'joi';

const userSchema = Joi.object().keys({
  name: Joi.string().alphanum().min(3).max(20).required(),
});

const updateUserSchema = Joi.object().keys({
  name: Joi.string().alphanum().min(3).max(20),
});

const idSchema = Joi.number();
const stringSchema = Joi.string().alphanum();

const SchemaValidate = {
  userSchema,
  updateUserSchema,
  idSchema,
  stringSchema,
};

export default SchemaValidate;
