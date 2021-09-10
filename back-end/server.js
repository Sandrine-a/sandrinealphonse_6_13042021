//Importer le package http pour création du server:
const http = require('http');

//Importer l'application express:
const app = require('./app');

//Indication à l'app sur quel port tourner:
app.set('port', process.env.PORT || 3000);

//Notre application serveur:
const server = http.createServer(app);

server.listen(process.env.PORT || 3000);