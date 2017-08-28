import dotenv from 'dotenv';

dotenv.load();

export default {
  env: 'production',
  jwtSecret: process.env.JWT_SECRET,
  db: process.env.DB_HOST,
  port: 4040,
  corsOrigin: process.env.CORS_ORIGIN,
  validUn: process.env.VALID_UN
};
