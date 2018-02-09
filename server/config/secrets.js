// Add Secrets and DB Here
import dotenv from 'dotenv';

dotenv.config();


export const sessionSecret = process.env.SESSION_SECRET || 'Your Session Secret goes here';
export const jwtSecret = process.env.JWT_SECRET || 'Your JWT Secret goes here';
export const db = process.env.MONGO_COMPOSE_URL || 'mongodb://sidharthchugh:Yoginder.123@207.154.245.10:27017/DigitalPartners-Web';
export const elasticURL = process.env.elasticURL || 'http://207.154.245.10:9220/';
export const projectLinkURL = process.env.projectLinkURL || 'https://digitalpartners.io/projects/';

export default {
  sessionSecret,
  jwtSecret,
  db,
  elasticURL
};
