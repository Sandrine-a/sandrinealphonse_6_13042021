//Import Express-validator pour controler input form user
const { body, validationResult } = require('express-validator');

//Vérification et validation des input User
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
  return res.status(422).json({
    errors: validatorErrors,
  })
};

module.exports = {
  userValidator,
  validate,
}
