import dns from 'dns';
import mongoose from 'mongoose';
import { config } from './index';

export const connectToDatabase = async (): Promise<void> => {
  if (!config.mongoUri) {
    console.warn('MongoDB URI is not defined in environment variables.');
    return;
  }

  if (config.dnsServers.length) {
    dns.setServers(config.dnsServers);
  }

  try {
    await mongoose.connect(config.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    } as mongoose.ConnectOptions);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};
