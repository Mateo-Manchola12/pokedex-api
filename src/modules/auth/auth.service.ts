import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authRepository } from './auth.repository';
import { AppError } from '../../shared/middlewares/errorHandler';
import { env } from '../../config/env';

export interface AuthPayload {
  userId: number;
  email: string;
}

function signToken(payload: AuthPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN } as jwt.SignOptions);
}

export const authService = {
  async register(email: string, password: string): Promise<{ token: string; user: { id: number; email: string } }> {
    const existing = authRepository.findByEmail(email);
    if (existing) throw new AppError('Email already in use', 400);

    const hashed = await bcrypt.hash(password, 10);
    const user = authRepository.create(email, hashed);
    const token = signToken({ userId: user.id, email: user.email });
    return { token, user: { id: user.id, email: user.email } };
  },

  async login(email: string, password: string): Promise<{ token: string; user: { id: number; email: string } }> {
    const user = authRepository.findByEmail(email);
    if (!user) throw new AppError('Invalid credentials', 401);

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new AppError('Invalid credentials', 401);

    const token = signToken({ userId: user.id, email: user.email });
    return { token, user: { id: user.id, email: user.email } };
  },
};
