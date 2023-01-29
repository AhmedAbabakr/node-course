const express = require('express');
const router = express.Router();
router.get('/',(request,response,next) => {
    response.send("<h1>Welcome Home</h1>");

});
module.exports = router;