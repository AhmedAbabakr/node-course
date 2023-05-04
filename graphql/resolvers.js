const userModel = require('../models/user');
const postModel = require('../models/post');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const isAuth = require('../middlewares/is-auth');
module.exports = {
    hello() {
        return {
            text:"Hello World!",
            views:124
        }
    },
    createUser: async function({ userInput },req)
    {
        console.log(userInput.email);
        const email = userInput.email;
        const name = userInput.name;
        const password = userInput.password;
        const existsUser = await userModel.findOne({where:{email}});
        if(existsUser)
        {
            const error = new Error("User Already Exists");
            throw error
        }
        const hashedPassword =await bcrypt.hash(password,12);
        const user = await userModel.create({
            email:email,
            name:name,
            password:hashedPassword
        });
        return user;
    },
    login: async function({email,password},req)
    {
        if(isAuth && req.user)
        {
            
            const error = new Error("authanticated");
            throw error
        }
        const user = await userModel.findOne({where:{email}});
        if(!user)
        {
            const error = new Error("User Already not Exists");
            throw error
        }
        const validPassword = await bcrypt.compare(password,user.password);
        if(!validPassword)
        {
            const error = new Error("email or password invalid");
            throw error
        }
        const token =  jwt.sign({
            id:user.id,
            email:user.email,
            name:user.name
        },"secretsecretsecret",{expiresIn:"1d"});
        console.log({token:token,name:user.name});
        return {token:token,name:user.name};
    },
    createPost: async function({postInput},req)
    {
        if(!req.isAuth || !req.user)
        {
            const error = new Error("unauthanticated");
            throw error
        }
        if(postInput.length === 0) {
            const error = new Error("Invalid Inputs");
            throw error
        }
       
        const title= postInput.title;
        const content= postInput.content;
        const imageUrl= postInput.imageUrl;
        if(!title||!content||!imageUrl) {
            const error = new Error("Invalid Inputs");
            throw error
        }
        const post = await postModel.create({
            title:title,
            content:content,
            imageUrl:imageUrl,
            creator:req.user.name,
            userId : req.user.id,
        });
        return post;
    },
    postList: async function({page},req)
    {
        if(!req.isAuth || !req.user)
        {
            const error = new Error("unauthanticated");
            throw error
        }
        
        if(!page)
        {
             page = 1;
        }
        const totalCount = await postModel.count();
        const perPage = 1;
         const offset = (page - 1) * perPage;

        const posts = await postModel.findAll({
            where:{
                userId : req.user.id,
            },
            limit:perPage,
            offset:offset
           
        });
        console.log(posts);
        return {post:posts,totalCount:totalCount};
    },
    postById:   async function({id},req)
    {
        if(!req.isAuth || !req.user)
        {
            const error = new Error("unauthanticated");
            throw error
        }
        const post = await postModel.findOne({
            where:{
                userId : req.user.id,
                id:id
            }
        });
        if(!post)
        {
            throw new Error("Record Not Found");
        }
        console.log(post)
        return post;
    },
    updatePost: async function({id,postInput},req)
    {
        if(!req.isAuth || !req.user)
        {
            const error = new Error("unauthanticated");
            throw error
        }
        const title= postInput.title;
        const content= postInput.content;
        const imageUrl= postInput.imageUrl;
        if(!title||!content||!imageUrl) {
            const error = new Error("Invalid Inputs");
            throw error
        }
        const post = await postModel.findOne({
            where:{
                userId : req.user.id,
                id:id
            }
        });
        if(!post)
        {
            const error = new Error("Invalid Record");
            throw error;
        }
        post.title = title;
        post.content = content;
        post.imageUrl = imageUrl;
        post.save();
        return post;

    },
    deletePost:   async function({id},req)
    {
        if(!req.isAuth || !req.user)
        {
            const error = new Error("unauthanticated");
            throw error
        }
        const post = await postModel.findOne({
            where:{
                userId : req.user.id,
                id:id
            }
        });
        if(!post)
        {
            throw new Error("Record Not Found");
        }
        const destroied =  await post.destroy({ returning: true });
        
        if (destroied) {
            return true;
          } else {
            return false;
          }
    },
}