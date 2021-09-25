const express = require('express');

const router = express.Router();
//Import des middleware validator du user form
const { userValidator, validate }  = require('../middleware/validator');
//Import controleur user:
const userCtrl = require('../controllers/user');

//Route pour signup:
router.post('/signup', userValidator(), validate , userCtrl.signup);
//Route pour login:
router.post('/login', userValidator(), validate , userCtrl.login);

//Export des routes users:
module.exports = router;