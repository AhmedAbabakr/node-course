const db = require('../util/database');
const sequelize = require('sequelize');
const Cart = db.define('cart',{
  id : {
    type:sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true,
    allowNull:false
  }
});
module.exports = Cart;