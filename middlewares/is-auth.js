const jwt = require('jsonwebtoken');
module.exports = (req,res,next) => {
    const token = req.get('Authorization');
    let decodedToken;
    if(!token)
    {
        const error = new Error('not authenticated');
        error.statusCode = 401;
        throw error;
    }
    const userToken = token.split(' ')[1];
    try{
        decodedToken = jwt.verify(userToken,"secretTokenWebsecretTokenWeb")
    } catch(err) {
        err.statusCode = 500;
        throw err;
    }

    if(!decodedToken)
    {
        const error = new Error('not authenticated');
        error.statusCode = 401;
        throw error;
    }
    req.user = decodedToken;
    next();
}