const multer = require('multer');

//Ajout du dictionnaire des mimetypes
const MIME_TYPES = {
  'image/jpg' : 'jpg',
  'image/jpeg' : 'jpeg',
  'image/pgn' : 'png'
};

//Middleware de gestion de fichiers img
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null,'images')
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');