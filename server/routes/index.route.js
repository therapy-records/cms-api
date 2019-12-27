const express = require('express');
const authRoutes = require('./auth.route');
const gigsRoutes = require('./gigs.route');
const journalismRoutes = require('./journalism.route');
const newsRoutes = require('./news.route');
const pressRoutes = require('./press.route');
const userRoutes = require('./user.route');
const testRoutes = require('./test.route');
const config = require('../../config/env');

const router = express.Router(); // eslint-disable-line new-cap

router.use('/auth', authRoutes);

router.use('/gigs', gigsRoutes);

router.use('/journalism', journalismRoutes);

router.use('/news', newsRoutes);

router.use('/press', pressRoutes);

if (config.nonProductionRoutes === 'true') {
  router.use('/user', userRoutes);
  router.use('/test', testRoutes);
}

module.exports = router;
