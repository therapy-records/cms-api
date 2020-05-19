const express = require('express');
const cloudinary = require('cloudinary');
const authRoutes = require('./auth.route');
const journalismRoutes = require('./journalism.route');
const newsRoutes = require('./news.route');
const userRoutes = require('./user.route');
const testRoutes = require('./test.route');
const config = require('../../config/env');

const router = express.Router(); // eslint-disable-line new-cap

router.use('/auth', authRoutes);

router.use('/journalism', journalismRoutes);

router.use('/news', newsRoutes);

cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_secret: config.cloudinaryApiSecret,
  api_key: config.cloudinaryApiKey
});

router.delete('/cloudinary-destroy', (req, res) => {
  const { publicId } = req.body;

  const options = {
    invalidate: true
  };

  cloudinary.v2.uploader.destroy(publicId, options, (error) => {
    if (error) {
      return res.status(500).send(error);
    }
    return res.json({ success: true });
  });
});


router.post('/cloudinary-upload', (req, res) => {
  const { image } = req.body;

  cloudinary.v2.uploader.upload(image, {}, (error, response) => {
    if (error) {
      return res.status(500).send(error);
    }
    return res.json({
      success: true,
      data: {
        public_id: response.public_id,
        url: response.url,
      }
    });
  });
});

if (config.nonProductionRoutes === 'true') {
  router.use('/user', userRoutes);
  router.use('/test', testRoutes);
}

module.exports = router;
