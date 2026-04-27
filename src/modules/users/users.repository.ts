import db from '../../config/database';
import { UserRow } from '../auth/auth.repository';

export const usersRepository = {
  findById(id: number): UserRow | undefined {
    return db.prepare('SELECT id, email, createdAt FROM User WHERE id = ?').get(id) as UserRow | undefined;
  },

  findAll(): UserRow[] {
    return db.prepare('SELECT id, email, createdAt FROM User').all() as UserRow[];
  },
};
