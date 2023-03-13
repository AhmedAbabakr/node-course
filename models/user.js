const sequelize = require('sequelize');
const db = require('../util/database');

const User = db.define('users',{
    id:{
        type: sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    email : sequelize.STRING,
    name : sequelize.STRING

})
module.exports = User;