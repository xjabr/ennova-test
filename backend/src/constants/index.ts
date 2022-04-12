require('dotenv').config();

export const JWT_SECRETS = process.env.JWT_SECRETS || 'secret';
export const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/ennova-test';