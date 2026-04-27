import morgan from 'morgan';
import { env } from '../../config/env';

export const logger = morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev');
