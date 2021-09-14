const express = require('express');

const router = express.Router();

//Importer controleur user:
const sauceCtrl = require('../controllers/sauce');
//Importation du middleware d'authentification
const auth = require('../middleware/auth');
//Importation du middleware d'authentification
const multer = require('../middleware/multer-config');

//Route pour ajouter une sauce:
router.post('/', auth, multer, sauceCtrl.createSauce);
//Route pour affichertoutes les sauces:
router.get('/', auth, sauceCtrl.getAllSauces);

//Export des routes users:
module.exports = router;
