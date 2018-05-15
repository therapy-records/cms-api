const dotenv = require('dotenv');

dotenv.load();

module.exports = {
  env: 'development',
  MONGOOSE_DEBUG: true,
  jwtSecret: process.env.JWT_SECRET,
  db: process.env.DB_HOST,
  port: 4040,
  corsOrigin: process.env.CORS_ORIGIN,
  validUn: process.env.VALID_UN,
  nonProductionRoutes: process.env.NON_PRODUCTION_ROUTES
};
