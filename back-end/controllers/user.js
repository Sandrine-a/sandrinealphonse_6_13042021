//Importer le modèle User
const User = require('../models/user');
//Importer les variables d'env
require('dotenv').config();
//Importer bcrypt pour hash dans signup
const bcrypt = require('bcrypt');
//Importer jsonwebtoken pour générer des tokens d'authentification
const jwt = require('jsonwebtoken');

//Middleware signup:
exports.signup = (req,res,next) => {
  bcrypt.hash(req.body.password, 12)
  .then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user.save()
    .then(() => res.status(201).json({ message: 'Bienvenue! Utilisateur créé!'}))
    .catch(error => res.status(400).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
};

//Middleware login:
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur inconnu !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot-de-passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
            {userId: user._id},
            process.env.USER_SECRET_TOKEN,
            {expiresIn: '24h'}
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

