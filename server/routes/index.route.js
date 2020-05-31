const express = require('express');
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

if (config.nonProductionRoutes === 'true') {
  router.use('/user', userRoutes);
  router.use('/test', testRoutes);
}

module.exports = router;
