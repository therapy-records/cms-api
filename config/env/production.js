const dotenv = require('dotenv');

dotenv.load();

module.exports = {
  env: 'production',
  jwtSecret: process.env.JWT_SECRET,
  db: process.env.DB_HOST,
  port: 3000,
  corsOrigin: process.env.CORS_ORIGIN,
  validUn: process.env.VALID_UN,
  rootUrl: process.env.ROOT_URL,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME
};
