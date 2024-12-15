const multer = require('multer');

const storage = multer.memoryStorage(); // Use memory storage
const limits = {
  fileSize: 500000000, // Adjust the fileSize limit accordingly
};

const upload = multer({ storage, limits });

module.exports = {upload};