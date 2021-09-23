const jwt = require('jsonwebtoken');

//Middleware d'authentification:
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; 
    const decodedToken = jwt.verify(token, process.env.USER_SECRET_TOKEN); 
    const userId = decodedToken.userId; 
    if (req.body.userId && req.body.userId !== userId) {
      throw new Error(' unauthorized User!');;
    } else {
      next();
    }
  } catch(error) {
    res.status(403).json({error: (' unauthorized request!')});
  }
};