
//Importer Express-validator pour control input form
const { body, validationResult } = require('express-validator');

//validation des input User
const userValidator = () => {
  return [
    body('email', 'please enter a valid email').toLowerCase().isEmail().isLength({ min: 3, max: 70 }),
    body('password', 'please enter a password between 5 and 60 char').isLength({ min: 5, max: 60}),
  ]
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next()
  }
  const validatorErrors = []
  errors.array().map(err => validatorErrors.push({ [err.param]: err.msg }));
  console.log(validatorErrors);
  return res.status(422).json({
    errors: validatorErrors,
  })
};

module.exports = {
  userValidator,
  sauceValidator,
  validate,
}
