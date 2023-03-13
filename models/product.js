const sequelize = require("sequelize");
const db = require('../util/database');
const Product = db.define('products',{
  id:{
    type : sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
  },
  title:sequelize.STRING,
  price : {
    type:sequelize.DOUBLE,
    allowNull:false
  },
  imageUrl : {
    type:sequelize.STRING,
    allowNull:false
  }, 
  description : {
    type:sequelize.STRING,
    allowNull:false
  }
},{
  timestamps: false
  });
module.exports = Product;
