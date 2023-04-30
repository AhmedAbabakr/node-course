const { DataTypes } = require('sequelize');
const sequelizeConnection = require('../util/db');

const User = sequelizeConnection.define('user',{
    id:{
        type : DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue: 'active'
    },
});
module.exports = User;