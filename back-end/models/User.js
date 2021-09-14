const mongoose = require('mongoose');

//Importer unique validator:
const uniqueValidator = require('mongoose-unique-validator');

//Création du schema de données pour User
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: {type: String, required: true }
});

//Ajout de la vérification mongoose-unique-validator pour décter les dupe mails
userSchema.plugin(uniqueValidator);

//Export du Schema
module.exports = mongoose.model('User', userSchema);