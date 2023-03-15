const db = require('../util/database');
const sequelize = require('sequelize');
const cartItem = db.define('cartItem',{
  id : {
    type:sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true,
    allowNull:false
  },
  quantity:sequelize.INTEGER
});
module.exports = cartItem;