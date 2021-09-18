const mongoose = require('mongoose');

//Création du schema de données pour les Sauces
const sauceSchema = mongoose.Schema({
    userId: {type: String, required: true },
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: true},
    mainPepper: {type: String, required: true},
    heat: {type: Number, required: true, min : 0,},
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
    usersLiked: {type: Array, default:[]},
    usersDisliked: {type: Array, default:[]}
});

//Export du Schema
module.exports = mongoose.model('Sauce', sauceSchema);