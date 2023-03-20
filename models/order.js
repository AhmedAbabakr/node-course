const sequlize= require('sequelize');
const db = require('../util/database');
const Order = db.define('order',{
    id:{
        type:sequlize.INTEGER,
        allowIncrement:true,
        primaryKey:true,
        allowNull:false
    }
});

module.exports = Order;