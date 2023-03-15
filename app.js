const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cartItem');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((request,response,next) => {
  
    User.findByPk(1).then(result => {
         console.log(result);
        request.user =result;
        next();
       
    });
 
})
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);
Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem});

sequelize
// .sync({force:true})
.sync()
.then(result =>{
    return User.findByPk(1);

})
.then(user => {
    if(!user)
    {
        return User.create({name:"Admin",email:"admin@admin.com"});
    }
    return user
})
.then(user => {
    return user.getCart();
    // if(!user.getCart().the)
    // {
        // user.createCart();
    // }
    // return user 
})

.then(cart => {
    app.listen(3000);
})
.catch(error => {
    console.log(error);
})



