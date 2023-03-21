const db = require('../util/database');
const sequelize = require('sequelize');
const OrderItem = db.define('orderItem',{
  id : {
    type:sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true,
    allowNull:false
  },
  quantity:sequelize.INTEGER
});
module.exports = OrderItem;