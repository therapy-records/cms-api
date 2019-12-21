const mongoose = require('mongoose');
const util = require('util');
const config = require('./config/env');
const app = require('./config/express');
const wakeDyno = require('woke-dyno');

const port = process.env.PORT || config.port || 3000;

const debug = require('debug')('express-mongoose-es6-rest-api:index');

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

// plugin bluebird promise in mongoose
mongoose.Promise = Promise;

// connect to mongo db
mongoose.connect(config.db, {
  server: {
    socketOptions: { keepAlive: 3000 },
    autoReconnect: true
  },
});
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.db}`);
});

// print mongoose logs in dev env
if (config.MONGOOSE_DEBUG) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

// listen on port config.port
app.listen(port, () => {
  console.log(`server started on port ${port}(${config.env})`); // eslint-disable-line
  // debug(`server started on port ${port} (${config.env})`);
  if (config.env === 'production') {
    wakeDyno({
      url: `${config.rootUrl}/api/health-check`,
      interval: 1680000
    }).start();
  }
});

module.exports = app;
