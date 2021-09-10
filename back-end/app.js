const express = require('express');

const app = express();

// Middleware:
app.use((req,res) => {
  res.json({ message: 'La requête est ici !'})
})
module.exports = app;