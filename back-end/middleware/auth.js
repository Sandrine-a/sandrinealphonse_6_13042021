const jwt = require('jsonwebtoken');

//Middleware d'authentification:
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; 
    const decodedToken = jwt.verify(token, 'anNvbmNvbXBsZXhfc2VjcmV0X1Rva2Vu'); 
    const userId = decodedToken.userId; 
    if (req.body.userId && req.body.userId !== userId) {
      throw 'UserId non reconnu';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};