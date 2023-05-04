const jwt = require('jsonwebtoken');
module.exports = (req,res,next) => {
    const token = req.get('Authorization');
    let decodedToken;
    console.log(token);
    console.log("Test");
    if(!token)
    {
        
        //Rest APi Handle
        // const error = new Error('not authenticated');
        // error.statusCode = 401;
        // throw error;
        // ##########
        //graphql handle
        req.isAuth =false;
        next();
    }else{

        const userToken = token.split(' ')[1];
        
        try{
            // decodedToken = jwt.verify(userToken,"secretTokenWebsecretTokenWeb")
            decodedToken = jwt.verify(userToken,"secretsecretsecret")
        } catch(err) {
            //Rest APi Handle
            // err.statusCode = 500;
            // throw err;
            // ##########
            //graphql handle

            req.isAuth =false;
            next();
        }

        if(!decodedToken)
        {
            //Rest APi Handle
            // const error = new Error('not authenticated');
            // error.statusCode = 401;
            // throw error;
            // ##########
            //graphql handle

            req.isAuth =false;
            next();
        }
        req.user = decodedToken;
        // console.log(req.user);
        req.isAuth = true;
        next();
    }
   
}