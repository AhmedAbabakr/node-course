const { response } = require('express');
const path = require('path');
const rootDir = require('../util/path');
const products = []; 
exports.index = (request,response,next) => {
    response.render('shop',{
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
    })
}

exports.create = (request,response,next) => {
    response.render('add-product', {
        pageTitle: 'Add Product',
        path: '/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
      });
}

exports.store = (request,response,next) => {
    products.push({title:request.body.title});
    response.redirect('/all-products');
}