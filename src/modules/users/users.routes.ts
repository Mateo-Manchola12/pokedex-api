import { Router } from 'express';
import { usersController } from './users.controller';
import { verifyToken } from '../auth/auth.middleware';

const router = Router();

router.get('/me', verifyToken, usersController.getMe);

export default router;
