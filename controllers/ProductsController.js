const { response } = require('express');
const path = require('path');
const rootDir = require('../util/path');
// const products = []; 
const Product = require('../models/Product');


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
    const products = new Product(request.body.title);
    products.save();
    response.redirect('/all-products');
}

exports.index = (request,response,next) => {
    Product.fetchAll(products => {
        response.render('shop', {
          prods: products,
          pageTitle: 'Shop',
          path: '/',
          hasProducts: products.length > 0,
          activeShop: true,
          productCSS: true
        });
      });
}