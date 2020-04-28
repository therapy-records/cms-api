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

router.get('/cloudinary-signature', (req, res) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const data = {
    timestamp
  };
  const signature = cloudinary.utils.api_sign_request(data, config.cloudinaryApiSecret);
  return res.json({
    key: config.cloudinaryApiKey,
    signature,
    timestamp
  });
});

router.delete('/cloudinary-destroy', (req, res) => {
  const { publicId } = req.body;

  cloudinary.v2.uploader.destroy(publicId, {}, (error) => {
    if (error) {
      return res.status(500).send(error);
    }
    return res.json({ success: true });
  });
});

if (config.nonProductionRoutes === 'true') {
  router.use('/user', userRoutes);
  router.use('/test', testRoutes);
}

module.exports = router;
