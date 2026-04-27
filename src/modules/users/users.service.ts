import { usersRepository } from './users.repository';
import { AppError } from '../../shared/middlewares/errorHandler';

export const usersService = {
  getById(id: number) {
    const user = usersRepository.findById(id);
    if (!user) throw new AppError('User not found', 404);
    return user;
  },

  getAll() {
    return usersRepository.findAll();
  },
};
