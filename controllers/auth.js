const User = require('../models/user');
exports.getLogin = (req, res, next) => {
    // console.log(req.session.isLoggedIn);
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated:req.session.isLoggedIn,
    });
     
  };

  exports.postLogin = (req,res,next) => {
    // res.setHeader('Set-Cookie','loggedIn=true');
    User.findOne().then(user => {
      req.session.user = user;
      req.session.isLoggedIn = true;
      res.redirect('/');
    }).catch(err => {
      console.log(err);
    });
  
   
  }

  exports.postLogout = (req,res,next) => {
    req.session.destroy(()=>{
      res.redirect('/');
    });
  }
  