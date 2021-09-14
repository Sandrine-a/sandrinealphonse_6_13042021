//Importer modèle User:
const Sauce = require('../models/product');

//Middlewae pour créer une sauce:
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  console.log(sauce);
  sauce.save()
    .then(() => res.status(201).json({ message: ' Sauce enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
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