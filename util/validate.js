exports.validate = (schema) => {
    return (req,res,next) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false });
        if (error) {
        // const messages = error.details.map((err) => err.message);
        const errors = error.details.reduce((prev, curr) => {
            prev[curr.path[0]] = curr.message;
            return prev;
        }, {});
        return res.status(422).json({ errors: errors });
        }
        next();
    }
} 