const express = require('express');

const router = express.Router();

//Importation du middleware d'authentification
const auth = require('../middleware/auth');
//Importation du middleware d'authentification
const multer = require('../middleware/multer-config');

//Importer controleur user:
const sauceCtrl = require('../controllers/sauce');

//Route pour affichertoutes les sauces:
router.get('/', auth, sauceCtrl.getAllSauces);
//Route pour ajouter une sauce:
router.post('/', auth, multer, sauceCtrl.createSauce);

//Export des routes users:
module.exports = router;
