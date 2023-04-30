const Joi = require('joi');
const storeSchema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
   content: Joi.string().min(3).required(),
  });

  module.exports = storeSchema;