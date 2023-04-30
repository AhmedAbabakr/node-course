const {check,validationResult} = require('express-validator');
const postSchema =require('./postSchema');
exports.validateStore = (req,res,next) => {
  const { error, value } = postSchema.validate(req.body, { abortEarly: false });
  if (error) {
    // const messages = error.details.map((err) => err.message);
    const errors = error.details.reduce((prev, curr) => {
      prev[curr.path[0]] = curr.message;
      return prev;
    }, {});
    return res.status(422).json({ errors: errors });
  }
  next();
  // old way with express validator
  // const rules = [
  //     check('title').trim().isLength({ min: 5 }).withMessage('Title should be at least 5 characters long'),
  // check('content').trim().isLength({ min: 5 }).withMessage('Content should be at least 5 characters long')
  // ];

  // Promise.all(rules.map(rule => rule.run(req)))
  // .then(() => {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(422).json({ errors: errors.array() });
  //   }
  //   next();
  // });
}