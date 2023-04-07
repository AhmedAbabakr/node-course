const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');
const mongoose = require('mongoose');
const session = require('express-session');
const MONGODBSession = require('connect-mongodb-session')(session);
const app = express();
const isAuth = require('./middlewares/is-auth');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const csrf = require('csurf');
const flash = require('connect-flash');
app.set('view engine', 'ejs');
app.set('views', 'views');

const MONGODBURI = "mongodb+srv://ahmedababakr:K4PTn5rGMImk2w9k@cluster0.rgtozde.mongodb.net/shop?retryWrites=true&w=majority";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
const sessionStore = new MONGODBSession({
  uri:MONGODBURI,
  collection:"sessions"
})

app.use(session({
  secret:"my secret",resave:false,saveUninitialized:false
  ,store:sessionStore
}));

app.use(csrf());
app.use(flash());
app.use((request,response,next) => {
  response.locals.isAuthenticated = request.session.isLoggedIn;
  response.locals.csrfToken = request.csrfToken();
  response.locals.errorMessage = request.flash('error');
  next();
})
app.use((req, res, next) => {
  if(!req.session.user)
  {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      // console.log(user)
        req.user = user;
        next();
    })
    .catch(err => console.log(err));
});

app.use('/admin',isAuth, adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

// mongoConnect(() => {
//   app.listen(3000);
// });

mongoose.connect(MONGODBURI)
.then(result => {
  User.findOne()
  .then(user => {
    if(!user)
    {
        user = new User({
          name:"Ahmed Abobakr",
          email:"Ahmedababakr@yahoo.com",
          cart:[]
        });
        user.save();
    }
  })
  app.listen(3000);

})
.catch(error => {
  console.log(error)
})