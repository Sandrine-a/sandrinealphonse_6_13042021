const express = require('express');

const router = express.Router();
//Importer validator user form
const { userValidator, validate }  = require('../middleware/validator');
//Importer controleur user:
const userCtrl = require('../controllers/user');

//Route pour signup:
router.post('/signup', userValidator(), validate , userCtrl.signup);
//Route pour login:
router.post('/login', userValidator(), validate , userCtrl.login);


//Export des routes users:
module.exports = router;