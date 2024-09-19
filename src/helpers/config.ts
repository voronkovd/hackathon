import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

interface ENV {
  NODE_ENV: string | undefined;
  MONGO_URI: string | undefined;
}

interface Config {
  NODE_ENV: string;
  MONGO_URI: string;
}

const getConfig = (): ENV => ({
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.MONGO_URI,
});

const getSanitzedConfig = (config: ENV): Config => {
  Object.entries(config).map(([key, value]) => {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in .env`);
    }

    return null;
  });

    return config as Config;
};

const config = getConfig();
const sanitizedConfig = getSanitzedConfig(config);
export default sanitizedConfig;
