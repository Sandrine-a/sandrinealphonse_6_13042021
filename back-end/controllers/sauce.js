//Importer modèle User:
const Sauce = require('../models/Sauce');

//Middlewae pour créer une sauce:
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);/* 
  delete sauceObject._id; */
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  console.log(sauce);
  console.log(sauceSchema);
  sauce.save()
    .then(() => res.status(201).json({ message: ' Sauce enregistré !'}))
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