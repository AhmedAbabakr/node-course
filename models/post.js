const { DataTypes } = require('sequelize');
const sequelizeConnection = require('../util/db');
const Post = sequelizeConnection.define('post',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement: true
    },
    title:{
        type:DataTypes.STRING,
    },
    content:{
        type:DataTypes.TEXT,
    },
    imageUrl:{
        type:DataTypes.STRING,
    },
    creator:{
        type:DataTypes.TEXT,
    }
}, {
    timestamps: true
  });

  module.exports =Post;