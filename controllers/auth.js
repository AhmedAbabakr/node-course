const User = require('../models/user');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const mailService = require('../util/mail');
const { response } = require('express');
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
  exports.getReset = (req, res, next) => {
    // console.log(req.session.isLoggedIn);
    res.render('auth/reset', {
        path: '/reset',
        pageTitle: 'Reset Password',
        // isAuthenticated:req.session.isLoggedIn??0,
    });
     
  };
  
  exports.postReset = (req,response,next) => {
    crypto.randomBytes(32, (err, buffer) => {
      if(err)
      {
        console.log(err);
        response.redirect('/reset');
      }
      const token = buffer.toString('hex');
      User.findOne({email:req.body.email})
      .then(user => {
        if(!user)
        {
          req.flash('error', 'User Not exists');
          return response.redirect('/reset');
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      }).then(result => {
        response.redirect('/');
        mailService.sendMail({
          to:req.body.email,
          from:"ahmedababakr@yahoo.com",
          subject:"Reset password Mail",
          html:`
          <p>Your requested a password reset</p>
          <p>Click to reset <a href="http://localhost:3000/reset/${token}">Link</a>
          `
        })
      }).catch(err => {
        console.log(err);
      })
    })
  }

  exports.getNewPassword = (req,res,next) => {
    const token = req.params.token;
    User.findOne({resetToken:token,resetTokenExpiration:{$gt:Date.now()}})
    .then(user => {
      if(!user)
      {
        req.flash('error', 'Invalid reset Token');
        return res.redirect('/reset');
      }
     return res.render('auth/new-password', {
        path: '/new-password',
        pageTitle: 'New Password',
        passwordToken: token,
        userId: user._id.toString()
      });
    })
    .catch(err => {
      console.log(err);
    })
  }

  exports.postNewPassword = (req,res,next) => {
    const token = req.body.passwordToken;
    const newPassword = req.body.password;
    const userId = req.body.userId;
    User.findOne({_id:userId,resetToken:token,resetTokenExpiration:{$gt:Date.now()}})
    .then(user => {
      console.log(user);
      if(!user)
      {
        req.flash('error', 'Invalid Action');
        return res.redirect('/reset/'+token);
      }
      return bcrypt.hash(newPassword,12)
      .then(hashedPassword => {
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        user.save();
        return res.redirect('/login');
      });
    })
  }