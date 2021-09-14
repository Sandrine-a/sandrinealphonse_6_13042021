const mongoose = require('mongoose');

//Création du schema de données pour les Sauces
const sauceSchema = mongoose.Schema({
  sauce: {
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    heat: {type: Number, min : 0},
    likes: {type: Number, min : 0},
    dislikes: {type: Number},
    usersLiked: [],
    usersDisliked: []
  },
  image: {
    imageUrl: {type: String, required: true},
  }
});

//Export du Schema
module.exports = mongoose.model('Sauce', sauceSchema);