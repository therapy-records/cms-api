const cloudinary = require('cloudinary');
const config = require('../../../../config/env');

cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_secret: config.cloudinaryApiSecret,
  api_key: config.cloudinaryApiKey
});

const cloudinaryQueryResolvers = {
  async cloudinarySignature() {
    const timestamp = Math.floor(Date.now() / 1000);
    const data = {
      timestamp
    };

    const signature = await cloudinary.utils.api_sign_request(data, config.cloudinaryApiSecret);

    return {
      key: config.cloudinaryApiKey,
      signature,
      timestamp
    };
  }
};

module.exports = cloudinaryQueryResolvers;
