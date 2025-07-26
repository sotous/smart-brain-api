const multer = require('multer');
const path = require('path');
const crypto = require('crypto'); // Use crypto for truly random names

// --- Secure Multer Storage Configuration ---
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    // Generate a random, secure name for the file. 
    // We are NOT using the user's original name for the base.
    const randomName = crypto.randomBytes(16).toString('hex');
    
    // Get the file extension and validate it
    const extension = path.extname(file.originalname).toLowerCase();
    
    // We don't need a fileFilter function if we just add the extension here
    cb(null, randomName + extension);
  }
});

// --- Add a File Filter for Security ---
const imageFileFilter = (req, file, cb) => {
  // Define a whitelist of allowed MIME types
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    // Accept the file
    cb(null, true);
  } else {
    // Reject the file
    cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'), false);
  }
};

const image = multer({ 
  storage: storage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5 // Limit file size to 5MB
  }
});

module.exports = {
    image
};
