import db from '../../config/database';
import { PokemonTypeRow } from '../pokemon/pokemon.repository';

export const typesRepository = {
  findAll(): PokemonTypeRow[] {
    return db.prepare('SELECT * FROM PokemonType').all() as PokemonTypeRow[];
  },
};
