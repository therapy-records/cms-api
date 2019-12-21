const express = require('express');
const authRoutes = require('./auth.route');
const collaboratorsRoutes = require('./collaborators.route');
const newsRoutes = require('./news.route');
const pressRoutes = require('./press.route');
const journalismRoutes = require('./journalism.route');
const userRoutes = require('./user.route');
const testRoutes = require('./test.route');
const config = require('../../config/env');

const router = express.Router(); // eslint-disable-line new-cap

router.use('/auth', authRoutes);

router.use('/collaborators', collaboratorsRoutes);

router.use('/news', newsRoutes);

router.use('/press', pressRoutes);

router.use('/journalism', journalismRoutes);

if (config.nonProductionRoutes === 'true') {
  router.use('/user', userRoutes);
  router.use('/test', testRoutes);
}

module.exports = router;
