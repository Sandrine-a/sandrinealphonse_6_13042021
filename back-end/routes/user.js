const express = require('express');

const router = express.Router();

//Importer controleur user:
const userCtrl = require('../controllers/user');

//Route pour signup:
router.post('/signup', userCtrl.signup);
//Route pour login:
router.post('/login', userCtrl.login);


//Export des routes users:
module.exports = router;