const express = require('express');
const router = express.Router();
const path = require('path');
router.get('/',(request,response,next) => {
    // response.send("<h1>Welcome Home</h1>");
    response.sendFile(path.join(__dirname,'..','views','home.html'));
});
module.exports = router;