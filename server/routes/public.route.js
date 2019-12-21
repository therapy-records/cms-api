const express = require('express');

const publicRoutes = express.Router(); // eslint-disable-line new-cap

publicRoutes.get('/health-check', (req, res) =>
  res.send('OK')
);

module.exports = publicRoutes;
