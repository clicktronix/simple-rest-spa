import * as dotenv from 'dotenv';

/**
 * Load environment variables from .env file.
 */
dotenv.config();

export const CONFIG = {
  baseUrl: process.env.PUBLIC_URL || 'https://localhost:8080',
  socketsPort: process.env.SOCKETS_PORT || '8081',
};
