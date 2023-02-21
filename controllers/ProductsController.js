const { response } = require('express');
const path = require('path');
const rootDir = require('../util/path');
// const products = []; 
const Product = require('../models/Product');
exports.index = (request,response,next) => {
    const products = Product.fetchAll();
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
    // products.push({title:request.body.title});
    const products = new Product(req.body.title);
    product.save();
    response.redirect('/all-products');
}