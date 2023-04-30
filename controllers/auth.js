const userModel = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.signup = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    userModel.findOne({
        where:{
            email
        }
    }).then(existsUser => {
        if(existsUser)
        {
            return res.status(422).json({message:"Email Already Exists"});
        }
       return  bcrypt.hash(password,12)
        .then(hashedPassword => {
            return userModel.create(
                {
                    name:name,
                    email:email,
                    password:hashedPassword
                }
            ).then(user => {
                return res.status(201).json({message:"User signup successfully"});
            }).catch(error => {
                if(!error.statuCode)
                {
                    error.statuCode = 500;
                }
                next(error);
            })
        }).catch(error => {
            if(!error.statuCode)
            {
                error.statuCode = 500;
            }
            next(error);
        });
    }).catch(error => {
        if(!error.statuCode)
        {
            error.statuCode = 500;
        }
        next(error);
    })
}

exports.login = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    return userModel.findOne({
        where:{
            email
        }
    }).then(existsUser => {
        if(!existsUser)
        {
            return res.status(422).json({message:"Invalid credentials"});
        }
        loadedUser= existsUser;
        return bcrypt.compare(password,existsUser.password);
    })
    .then(isEqual => {
        if(!isEqual)
        {
            return res.status(422).json({message:"Invalid credentials"});
        }
        const token = jwt.sign({
            id:loadedUser.id,
            email:loadedUser.email,
            name:loadedUser.name
        },"secretTokenWebsecretTokenWeb",{expiresIn:"1h"});
        return res.status(200).json({
            message:"User login successfully",
            token:token
        });
    })
    .catch(error => {
        if(!error.statuCode)
        {
            error.statuCode = 500;
        }
        next(error);
    });
}

exports.profile = (req,res,next) => {
    const id = req.user.id;
    return userModel.findByPk(id)
    .then(user => {
        if(!user)
        {
            const error = new Error('not authenticated');
            error.statusCode = 401;
            throw error;
        }
        return res.status(200).json({
            message:"User Status",
            status:user.status
        });
    }).catch(error => {
        if(!error.statuCode)
        {
            error.statuCode = 500;
        }
        next(error);
    });
}

exports.updateProfile = (req,res,next) => {
    const id = req.user.id;
    const status = req.body.status;
    return userModel.findByPk(id)
    .then(user => {
        if(!user)
        {
            const error = new Error('not authenticated');
            error.statusCode = 401;
            throw error;
        }
        user.status = status;
        user.save();
        return res.status(200).json({
            message:"User Status",
            status:user.status
        });
    }).catch(error => {
        if(!error.statuCode)
        {
            error.statuCode = 500;
        }
        next(error);
    });
}