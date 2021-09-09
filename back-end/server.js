const http = require('http');

const server = http.createServer((req,res) => {
  res.end('Réponse server test avec nodemon')
});

server.listen(process.env.PORT || 3000);