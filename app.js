const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');
const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findOne()
    .then(user => {
      console.log(user)
        req.user = user;
        next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// mongoConnect(() => {
//   app.listen(3000);
// });

mongoose.connect("mongodb+srv://ahmedababakr:K4PTn5rGMImk2w9k@cluster0.rgtozde.mongodb.net/shop?retryWrites=true&w=majority")
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