const Joi = require('joi');
const {Op} = require('sequelize');
const userModel = require('../models/user');
exports.signUpSchema = Joi.object({
    email:  Joi.string().email().min(4).required().custom((value, helpers) => {
        const email = value;
        return userModel.findOne({
            where : {
                email:{
                        [Op.eq]: email
                    }
                }
            }).then(user => {
                    if (user) {
                        return helpers.error('any.invalid', { message: 'Email already exists' });
                      }
                      return value;
                }).catch(err => {
                    return helpers.error('any.invalid', { message: 'Internal server error' });

                });
    }),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
      .messages({ 'any.only': 'Passwords do not match' }),
    name: Joi.string().min(3).required(),
});
exports.loginSchema = Joi.object({
    email:  Joi.string().email().min(4).required().custom((value, helpers) => {
        const email = value;
        return userModel.findOne({
            where : {
                email:{
                        [Op.eq]: email
                    }
                }
            }).then(user => {
                    if (user) {
                        return helpers.error('any.invalid', { message: 'Email already exists' });
                      }
                      return value;
                }).catch(err => {
                    return helpers.error('any.invalid', { message: 'Internal server error' });

                });
    }),
    password: Joi.string().min(6).required(),
})
exports.updateSchema = Joi.object({
  
    status: Joi.string().min(6).required(),
})
