import dotenv from 'dotenv';

dotenv.load();

export default {
  env: 'test',
  jwtSecret: process.env.TEST_JWT_SECRET,
  db: process.env.DB_HOST,
  username: process.env.TEST_USERNAME,
  pword: process.env.TEST_PWORD,
  port: process.env.PORT,
  validUn: process.env.VALID_UN
};
