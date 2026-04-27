import { pokemonRepository } from './pokemon.repository';
import { AppError } from '../../shared/middlewares/errorHandler';

export const pokemonService = {
  getPokemon(page: number, limit: number) {
    return pokemonRepository.findAll(page, limit);
  },

  getPokemonById(id: number) {
    const pokemon = pokemonRepository.findById(id);
    if (!pokemon) throw new AppError('Pokemon not found', 404);
    return pokemon;
  },

  getPokemonByType(typeId: number) {
    return pokemonRepository.findByTypeId(typeId);
  },
};
