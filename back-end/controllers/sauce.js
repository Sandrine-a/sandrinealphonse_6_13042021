//Importer modèle User:
const Sauce = require('../models/product');
//Importer le pakg fs pour gestion des fichiers
const fs = require('fs');

//Middleware pour créer une sauce:
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => res.status(201).json({ message: ' Sauce enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
};

//Middleware pour afficher une sauce:
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  })
  .then((sauce) => {
      res.status(200).json(sauce);
    }
  )
  .catch((error) => {
      res.status(404).json({
        error: error
      });
    }
  )
};

//Middleware pour Modifier une sauce:
exports.modifySauce = (req,res, next) => {
  const sauceObject = req.file ? {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : {
    ...req.body
  }              
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id})
  .then(() => res.status(200).json({ message: ' Sauce modifiée !'}))
  .catch(error => res.status(400).json({ error }));
};

//Middleware pour supprimer une sauce:
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id})
  .then(sauce => {
    const filename = sauce.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
      Sauce.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: ' Sauce supprimée :( '}))
      .catch(error => res.status(400).json({ error }));
    });
  })
  .catch(error => res.status(500).json({ error }));
};

//Middleware pour afficher toutes les sauces:
exports.getAllSauces = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};