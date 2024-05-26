import dotenv from 'dotenv';

dotenv.config();

export const APP_NAME = process.env.APP_NAME || 'App Name';
export const secretKey = process.env.JWT_SECRET_KEY || '';
export const serverPort = parseInt(process.env.PORT || '3000', 10);
export const FE_URL = process.env.VITE_APP_URL || '';
