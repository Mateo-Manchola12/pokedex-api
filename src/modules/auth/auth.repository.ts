import db from '../../config/database';

export interface UserRow {
  id: number;
  email: string;
  password: string;
  createdAt: string;
}

export const authRepository = {
  findByEmail(email: string): UserRow | undefined {
    return db.prepare('SELECT * FROM User WHERE email = ?').get(email) as UserRow | undefined;
  },

  create(email: string, hashedPassword: string): UserRow {
    const stmt = db.prepare('INSERT INTO User (email, password) VALUES (?, ?)');
    const result = stmt.run(email, hashedPassword);
    return db.prepare('SELECT * FROM User WHERE id = ?').get(result.lastInsertRowid) as UserRow;
  },

  findById(id: number): UserRow | undefined {
    return db.prepare('SELECT * FROM User WHERE id = ?').get(id) as UserRow | undefined;
  },
};
