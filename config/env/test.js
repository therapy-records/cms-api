const dotenv = require('dotenv');

dotenv.load();

module.exports = {
  env: 'test',
  MONGOOSE_DEBUG: true,
  jwtSecret: process.env.TEST_JWT_SECRET,
  db: process.env.TEST_DB_HOST,
  username: process.env.TEST_USERNAME,
  pword: process.env.TEST_PWORD,
  port: process.env.PORT,
  validUn: process.env.TEST_VALID_UN,
  nonProductionRoutes: process.env.NON_PRODUCTION_ROUTES
};
