const SequelizeObj = require('sequelize');
const sequelize = new SequelizeObj('test','root','',{
    dialect: 'mysql',
    host: 'localhost'
});
module.exports = sequelize;