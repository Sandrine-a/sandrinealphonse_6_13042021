const express = require('express');
//Import limiteur de req:
const rateLimit = require("express-rate-limit");
//Import Helmet pour sécurité headers
const helmet = require('helmet');
//Import cors
const cors = require('cors');
//Import mongoose pour utiliser mongo DB
const mongoose = require('mongoose');
//Import le chemin vers le fichiers images
const path = require('path');
//Import des routers
const userRoutes = require('./routes/user');
//Routers les sauces
const sauceRoutes = require('./routes/sauce');

//Limiteur de requetes pour sauce
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,// limit each IP to 100 requests per windowMs
});
//Limiter requetes pour login et signup:
const authentifyUserLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // start blocking after 5 requests
  message:
    "Too many authentifications from this IP, please try again after an hour"
});

const app = express();

//Authentification mongoAtlas:
mongoose.connect('mongodb+srv://'+process.env.DATABASE_USERNAME+':'+process.env.DATABASE_PASS+'@'+process.env.DATABASE_CLUSTER+'.tmgp6.mongodb.net/'+process.env.DATABASE_NAME+'?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(helmet());
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
//Analyse du corps de la req
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Middleware pour telechargement d'image vers le static:
app.use('/images', express.static(path.join(__dirname, 'images')));

//Utilisation des routes user:
app.use('/api/auth', authentifyUserLimiter, userRoutes);

//Utilisation des routes user:
app.use('/api/sauces', limiter, sauceRoutes);

module.exports = app;