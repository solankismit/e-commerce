const multer = require("multer");
const path = require("path"); // Import the path module

const FILE_TYPE_MAP = {
  "image/jpg": "jpg",
  "image/png": "png",
  "image/jpeg": "jpeg",
};
// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");

    if (isValid) {
      uploadError = null;
    }
    // Determine the destination directory based on your logic
    let destinationDir = "public/uploads/"; // Default directory

    // Create the directory if it doesn't exist
    cb(uploadError, destinationDir);
  },
  filename: function (req, file, cb) {
    let filename = req.body?.name?.split(" ").join("-");

    const ext = FILE_TYPE_MAP[file.mimetype];
    if (!filename) {
      filename = Date.now() + "-" + Math.round(Math.random() * 1e9);
    }
    cb(null, `${filename}-${Date.now()}.${ext}`);
  },
});

// Create Multer instance
exports.uploadOptions = multer({ storage: storage });
