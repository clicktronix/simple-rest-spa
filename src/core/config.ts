import * as dotenv from 'dotenv';

/**
 * Load environment variables from .env file.
 */
dotenv.config();

export const CONFIG = { baseUrl: process.env.BASE_URL || 'https://mysterious-cove-46705.herokuapp.com' };
