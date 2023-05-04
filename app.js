const express = require('express');
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');
const sequelizeConnection = require('./util/db');
const path = require('path');
const Post = require('./models/post');
const User = require('./models/user');
const {graphqlHTTP}= require('express-graphql');
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');
const isAuth = require('./middlewares/is-auth');
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use('/images',express.static(path.join(__dirname,'images')));
// app.use('/api',routes);

//auth handle in graphql
app.use(isAuth);
app.use('/graphql',graphqlHTTP({
  schema:graphqlSchema,
  rootValue:graphqlResolver,
  graphiql:true
}));



app.use((err,req,res,next) => {
    console.log(err);
    const status =err.statusCode || 500;
    const message = err.message;
    
    res.status(status).json({message:message});
})
User.hasMany(Post);
Post.belongsTo(User);

sequelizeConnection
  .sync()
  .then(() => {
    console.log('Database and tables created!');
    app.listen(8080);
  })
  .catch(error => {
    console.log(error);
  });
