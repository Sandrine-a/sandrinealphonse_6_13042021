const express = require('express');

const cors = require('cors');

//Importer mongoose pour utiliser mongo DB
const mongoose = require('mongoose');

//Importer le chemin vers le fichiers images
const path = require('path');
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
app.use(
  cors({
    origin(_, callback) {
      callback(null, true);
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    exposedHeaders: ['X-Filename'],
  }),
);

app.use(express.urlencoded({extended: true}));

//Analyse du corps de la req
app.use(express.json());


//Middleware pour telechargement d'image vers le static:
app.use('/images', express.static(path.join(__dirname, 'images')));

//Utilisation des routes user:
app.use('/api/auth', userRoutes);

//Utilisation des routes user:
app.use('/api/sauces', sauceRoutes);

module.exports = app;