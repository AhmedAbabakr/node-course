const express = require('express');
const path = require('path');
const router = express.Router();
router.get('/',(request,response,next) => {
    // response.send("<h1>Welcome Home</h1>");
    response.sendFile(path.join(__dirname,'../','views','welcome.html'));
});
module.exports = router;