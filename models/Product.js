const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');
const filePath =  path.join(
    rootDir,
    'data',
    'products.json'
  );
// const products = [];
const getProductsFromFile = cb => {
    fs.readFile(filePath, (err, fileContent) => {
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(fileContent));
      }
    });
  };
module.exports = class Product {
    constructor(t) {
      this.title = t;
    }

    save() {
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(filePath, JSON.stringify(products), err => {
              console.log(err);
            });
          });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
}