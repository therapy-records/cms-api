const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const methodOverride = require('method-override');
// const cors = require('cors');
const httpStatus = require('http-status');
const expressWinston = require('express-winston');
const expressValidation = require('express-validation');
const helmet = require('helmet');
const passport = require('passport');
// const pathToRegexp = require('path-to-regexp');
const winstonInstance = require('./winston');
const routes = require('../server/routes/index.route');
const publicRoutes = require('../server/routes/public.route');
const config = require('./env');
const passportConfig = require('./passport');
const APIError = require('../server/helpers/APIError');
const graphql = require('./graphql');

const app = express();

const router = express.Router(); // eslint-disable-line

if (config.env === 'development') {
  app.use('/api', logger('dev'));
}

// TOOD: is 50mb ok? perhaps too large
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

app.use('/.netlify/functions/server', router);

router.get('/public/tony-test', (req, res) => res.json({ helloWorld: true }));
app.use('/', router);

router.get('/public/test', (req, res) => res.json({ helloWorld: true }));

app.use('/public', publicRoutes);

// if (config.env !== 'test') {
//   let corsWhitelist;

//   if (config.corsOrigin.includes(' ')) {
//     corsWhitelist = config.corsOrigin.split(' ');
//   } else {
//     corsWhitelist = [config.corsOrigin];
//   }

//   const except = (path, fn) => {
//     const regexp = pathToRegexp.pathToRegexp(path);
//     return (req, res, next) => {
//       if (regexp.test(req.path)) return next();
//       return fn(req, res, next);
//     };
//   };

//   app.use(
//     except(['/public'],
//       cors({
//         origin: (origin, callback) => {
//           if (corsWhitelist.indexOf(origin) !== -1) {
//             callback(null, true);
//           } else {
//             callback(new Error('Not allowed by CORS'));
//           }
//         },
//         optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//       })
//     )
//   );
// }

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Accept');
  next();
});

// enable detailed API logging in dev env
if (config.env === 'development') {
  expressWinston.requestWhitelist.push('body');
  expressWinston.responseWhitelist.push('body');
  app.use('/api', expressWinston.logger({
    winstonInstance,
    meta: true, // optional: log meta data about request (defaults to true)
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
  }));
}

// use the passport package in our application
app.use(passport.initialize());
passportConfig(passport);

// mount all routes on /api path
app.use('/api', routes);

// mount graphql route
graphql.applyMiddleware({ app });

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
    const error = new APIError(unifiedErrorMessage, err.status, true);
    return next(error);
  } else if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic);
    return next(apiError);
  }
  return next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError('API not found', httpStatus.NOT_FOUND);
  return next(err);
});

// log error in winston transports except when executing test suite
if (config.env !== 'test') {
  app.use(expressWinston.errorLogger({
    winstonInstance
  }));
}

// error handler, send stacktrace only during development
app.use((err, req, res, next) => // eslint-disable-line no-unused-vars
  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    stack: config.env === 'development' ? err.stack : {}
  })
);

module.exports = app;
