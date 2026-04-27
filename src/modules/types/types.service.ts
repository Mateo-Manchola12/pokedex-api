import { typesRepository } from './types.repository';

export const typesService = {
  getAll() {
    return typesRepository.findAll();
  },
};
