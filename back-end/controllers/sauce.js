//Import modèle sauce
const Sauce = require('../models/product');
//Import le packg fs pour gestion des fichiers
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
  const updatedSauce = req.file ? { 
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : {
    ...req.body
  }
  Sauce.findOne({ _id: req.params.id}) //Recherche de la sauce modifiée en BDD 
  .then(sauce => {
    if(req.file) {
      //Suppression de l'ancienne image de la BDD
      const oldFilename = sauce.imageUrl.split('/images/')[1];
      try {
        fs.unlinkSync(`images/${oldFilename}`)
      } catch(error) {
        throw new Error("Erreur avec l'image envoyée")
      }
    }
  })
  Sauce.updateOne({ _id: req.params.id }, updatedSauce)
  .then(() => res.status(200).json({ message: ' Sauce modifiée !'}))
  .catch(error => res.status(400).json({ error }));
};

//Middelware pour liker/disliker une sauce
exports.likeOrDislikeSauce = (req,res,next) => {
    const like = 1;
    const dislike = -1;
    const cancelLike = 0;

    Sauce.findOne({ _id: req.params.id})
    .then(sauce => {
      //Like
      if (req.body.like === like && !sauce.usersLiked.includes(req.body.userId) && !sauce.usersDisliked.includes(req.body.userId)) {
        Sauce.updateOne({ _id: req.params.id },
          { $inc: {likes: +1}, 
          $push: {usersLiked: req.body.userId}
        })
        .then(() => res.status(200).json({ message: ' Sauce liked !'}))
        .catch(error => res.status(400).json({ error }));
      }
      //Annuler like
      else if (req.body.like === cancelLike && sauce.usersLiked.includes(req.body.userId)) {
        Sauce.updateOne({ _id: req.params.id },
          { $inc: {likes: -1}, 
          $pull: {usersLiked: req.body.userId}
        })
        .then(() => res.status(200).json({ message: ' Like cancel'}))
        .catch(error => res.status(400).json({ error }));
      }
      //Dislike sauce
      else if (req.body.like === dislike && !sauce.usersDisliked.includes(req.body.userId) && !sauce.usersLiked.includes(req.body.userId)) {
        Sauce.updateOne({ _id: req.params.id },
          { $inc: {dislikes: +1}, 
          $push: {usersDisliked: req.body.userId}
        })
        .then(() => res.status(200).json({ message: ' Sauce disliked ! '}))
        .catch(error => res.status(400).json({ error }));
      }
      //Annuler disklie
      else if (req.body.like === cancelLike && sauce.usersDisliked.includes(req.body.userId)) {
        Sauce.updateOne({ _id: req.params.id },
          { $inc: {dislikes: -1}, 
          $pull: {usersDisliked: req.body.userId}
        })
        .then(() => res.status(200).json({ message: ' Dislike cancel !'}))
        .catch(error => res.status(400).json({ error }));
      }
      // Autre 
      else {
        return res.status(400).json({error: (' Invalid request!')});
      }
    })
    .catch(error => res.status(500).json({ error }));  
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
  Sauce.find()
  .then((sauces) => {
      res.status(200).json(sauces);
    }
  )
  .catch((error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};