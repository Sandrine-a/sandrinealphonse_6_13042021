const express = require('express');
//Importer mongoose pour utiliser mongo DB
const mongoose = require('mongoose');

//Importation des routers:
const userRoutes = require('./routes/user');
//Routers les sauces:
const sauceRoutes = require('./routes/sauce');

const app = express();

//Authentification mongoAtlas:
mongoose.connect('mongodb+srv://admin:admin01@piiquante.tmgp6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


//Gestion des erreurs de CORS:
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.urlencoded({extended: true}));

//Analyse du corps de la req
app.use(express.json());

//Utilisation des routes user:
app.use('/api/auth', userRoutes);

//Utilisation des routes user:
app.use('/api/sauce', sauceRoutes);

module.exports = app;