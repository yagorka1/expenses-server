import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGODB_URI || '',
  // Comma-separated DNS servers for SRV lookups (e.g. "8.8.8.8,1.1.1.1"); empty = system default
  dnsServers: (process.env.DNS_SERVERS || '').split(',').map((s) => s.trim()).filter(Boolean),
  jwt: {
    secret: process.env.JWT_SECRET || 'dev-jwt',
    accessExpiration: '30m',
    refreshExpiration: '30d',
  },
  currencies: {
    apiUrl: 'https://api.frankfurter.app',
  },
};
