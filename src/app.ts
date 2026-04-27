import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { logger } from './shared/middlewares/logger';
import { errorHandler } from './shared/middlewares/errorHandler';
import authRoutes from './modules/auth/auth.routes';
import usersRoutes from './modules/users/users.routes';
import pokemonRoutes from './modules/pokemon/pokemon.routes';
import typesRoutes from './modules/types/types.routes';
import teamsRoutes from './modules/teams/teams.routes';

const app = express();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: 'Too many requests, please try again later.' },
});

app.use(cors());
app.use(express.json());
app.use(logger);
app.use(apiLimiter);

app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/pokemon', pokemonRoutes);
app.use('/types', typesRoutes);
app.use('/teams', teamsRoutes);

app.use(errorHandler);

export default app;
