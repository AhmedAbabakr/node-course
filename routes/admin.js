const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../util/path');
router.get('/',(request,response,next) => {
    // response.send("<h1>Welcome Home</h1>");
    // response.sendFile(path.join(__dirname,'..','views','home.html'));
    response.sendFile(path.join(rootDir,'views','home.html'));

});
module.exports = router;