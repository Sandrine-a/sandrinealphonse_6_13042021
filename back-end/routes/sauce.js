const express = require('express');

const router = express.Router();
//Import du middleware d'authentification
const auth = require('../middleware/auth');
//Import du middleware d'authentification
const multer = require('../middleware/multer-config');
//Import controleur user:
const sauceCtrl = require('../controllers/sauce');

//Route pour affichertoutes les sauces:
router.get('/', auth, sauceCtrl.getAllSauces);
//Route pour ajouter une sauce:
router.post('/', auth, multer, sauceCtrl.createSauce);
//Route afficher une sauce:
router.get('/:id', auth, sauceCtrl.getOneSauce);
//Route modifier une sauce:
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
//Route pour les like sauce:
router.post('/:id/like', auth, sauceCtrl.likeOrDislikeSauce);
//Route pour supprimer sauce:
router.delete('/:id', auth, sauceCtrl.deleteSauce);

//Export des routes users:
module.exports = router;
