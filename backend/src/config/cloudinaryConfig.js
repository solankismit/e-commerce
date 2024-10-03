const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    // Generate timestamp
    const timestamp = Math.floor(Date.now() / 1000);
    return {
      folder: "uploads", // Specify the folder in Cloudinary
      allowed_formats: ["jpg", "png", "jpeg"], // Allowed formats

      timestamp: timestamp, // Add timestamp
      api_key: process.env.CLOUDINARY_API_KEY, // Add API key
      api_secret: process.env.CLOUDINARY_API_SECRET,
    };
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
