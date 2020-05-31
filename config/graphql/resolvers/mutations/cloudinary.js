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

const removeFromCloudinary = publicId => new Promise((resolve, reject) => {
  const options = {
    invalidate: true
  };

  return cloudinary.v2.uploader.destroy(publicId, options, (error) => {
    if (error) {
      return reject(error);
    }
    return resolve({
      success: true
    });
  });
});

const cloudinaryMutationResolvers = {
  async cloudinaryUpload(root, {
    input,
  }, context) {
    return authCheck(context, uploadToCloudinary(input.image)
    );
  },
  async cloudinaryDelete(root, {
    input,
  }, context) {
    return authCheck(context, removeFromCloudinary(input.publicId)
    );
  },
};

module.exports = cloudinaryMutationResolvers;
