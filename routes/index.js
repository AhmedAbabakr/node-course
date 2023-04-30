const express = require('express');
const router = express.Router();
const feedRoutes = require('./feed');
const authRoutes = require('./auth');
router.use('/feed',feedRoutes);
router.use('/auth',authRoutes);
module.exports = router;