const { check } = require('express-validator');
const productModel = require('../models/product');
const validate = (method) => {
    const rules =  [
        check('title').notEmpty().withMessage('title   is required'),
        check('description').notEmpty().withMessage('description is required'),
        check('price').notEmpty().withMessage('price is required').isFloat({ min: 0 })
        .withMessage('Price must be a positive number.'),
        // check('imgUrl').notEmpty().withMessage('imgUrl is required').isURL().withMessage('Invalid URL'),
      ];
    switch (method) {
      
      case 'create': {
        return rules;
      }
      case 'update' : {
        return rules;
        idRule =   check('productId')
        .notEmpty()
        .custom((value,{req}) =>{
            return  productModel.findOne({_id:value})
            .then(existsProduct => {
                if(!existsProduct)
                {
                    return Promise.reject('Invalid Product');
                }
            })
            return true
        });
        rules.push(idRule);
        return rules;
      }
    }
  }
  module.exports =validate;