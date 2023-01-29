
const express = require('express');
const router = express.Router();
const shopRoutes =require('./shop');
const adminRoutes =require('./admin');
router.use([adminRoutes,shopRoutes])
module.exports =router