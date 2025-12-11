import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGODB_URI || '',
  jwt: {
    secret: process.env.JWT_SECRET || 'dev-jwt',
    accessExpiration: '30m',
    refreshExpiration: '30d',
  },
  currencies: {
    apiUrl: 'https://api.frankfurter.app',
  },
};
