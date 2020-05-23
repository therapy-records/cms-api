const cloudinary = require('cloudinary');
const config = require('../../../../config/env');
const authCheck = require('../../../../server/utils/authCheck');

cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_secret: config.cloudinaryApiSecret,
  api_key: config.cloudinaryApiKey
});

const uploadToCloudinary = image => new Promise((resolve, reject) =>
  cloudinary.v2.uploader.upload(image, (error, response) => {
    if (error) {
      return reject(error);
    }
    return resolve({
      publicId: response.public_id,
      url: response.url,
    });
  })
);

const cloudinaryMutationResolvers = {
  async cloudinaryUpload(root, {
    input,
  }, context) {
    return authCheck(context, uploadToCloudinary(input.image)
    );
  },
};

module.exports = cloudinaryMutationResolvers;
