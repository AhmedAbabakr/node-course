const User = require('../models/user');
const bcrypt = require('bcryptjs');
const mailService = require('../util/mail');
exports.getLogin = (req, res, next) => {
    // console.log(req.session.isLoggedIn);
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated:req.session.isLoggedIn,
    });
     
  };
exports.getSignup = (req, res, next) => {
    // console.log(req.session.isLoggedIn);
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        isAuthenticated:req.session.isLoggedIn??0,
    });
     
  };

  exports.postLogin = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    // res.setHeader('Set-Cookie','loggedIn=true');
    User.findOne({email:email}).then(user => {
      if(!user)
      {
        req.flash('error', 'Invalid Email Or Password');
        return res.redirect('/login');
      }
      bcrypt.compare(password,user.password)
      .then(doMatch => {
        if(doMatch)
        {
          req.session.user = user;
          req.session.isLoggedIn = true;
          return req.session.save(err => {
            res.redirect('/');
          });
        } else {
          return res.redirect('/login');
        }
      })
     
    }).catch(err => {
      console.log(err);
    });
  
   
  }
  exports.postSignup = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    User.findOne({email:email})
    .then(existsUser => {
      if(existsUser)
      {
        req.flash('error', 'Email ALready Taken');

        return  res.redirect('/signup');
      }
      return bcrypt.hash(password,12)
          .then(hashedPassword => {
            const email = req.body.email;
            const user =  new  User({
              // name:"",
              email:email,
              password:hashedPassword,
              cart:{items:[]}
            });
            return user.save();
          })
          .then(result => {
          
            return mailService.sendMail({
                to:email,
                from:"ahmedababakr@yahoo.com",
                subject:"Signup Mail",
                html:"<h1>Welcome onboard</h1>"
              })
              //  return;
          }).then(mailsuccess => {
            return res.redirect('/login');
          })
    })
    .catch(err => {
      console.log(err);
    })
   
  }

  exports.postLogout = (req,res,next) => {
    req.session.destroy(()=>{
      res.redirect('/');
    });
  }
  