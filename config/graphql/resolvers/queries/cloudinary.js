const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  api_key: process.env.CLOUDINARY_API_KEY
});

const cloudinaryQueryResolvers = {
  async cloudinarySignature() {
    const timestamp = Math.floor(Date.now() / 1000);
    const data = {
      timestamp
    };

    const signature = await cloudinary.utils.api_sign_request(
      data,
      process.env.CLOUDINARY_API_SECRET
    );

    return {
      key: process.env.CLOUDINARY_API_KEY,
      signature,
      timestamp
    };
  }
};

module.exports = cloudinaryQueryResolvers;
