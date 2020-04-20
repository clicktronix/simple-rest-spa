import * as dotenv from 'dotenv';

/**
 * Load environment variables from .env file.
 */
dotenv.config();

export const CONFIG = {
  baseUrl: process.env.REACT_APP_BASE_URL || 'https://localhost:8080',
  socketsPort: process.env.REACT_APP_SOCKETS_PORT || '8081',
};
