import db from '../../config/database';

export interface PokemonRow {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  generation: number;
  hp: number;
  stats: string;
  attack: string;
  defense: string;
}

export interface PokemonTypeRow {
  id: number;
  name: string;
  color: string;
  iconUrl: string;
}

export interface PokemonWithTypes extends Omit<PokemonRow, 'stats'> {
  stats: Record<string, number>;
  types: PokemonTypeRow[];
}

function attachTypes(pokemon: PokemonRow): PokemonWithTypes {
  const types = db
    .prepare(
      `SELECT pt.id, pt.name, pt.color, pt.iconUrl
       FROM PokemonType pt
       JOIN PokemonPokemonType ppt ON ppt.typeId = pt.id
       WHERE ppt.pokemonId = ?`
    )
    .all(pokemon.id) as PokemonTypeRow[];

  return {
    ...pokemon,
    stats: JSON.parse(pokemon.stats),
    types,
  };
}

export const pokemonRepository = {
  findAll(page: number, limit: number): { data: PokemonWithTypes[]; total: number } {
    const offset = (page - 1) * limit;
    const rows = db.prepare('SELECT * FROM Pokemon LIMIT ? OFFSET ?').all(limit, offset) as PokemonRow[];
    const { total } = db.prepare('SELECT COUNT(*) as total FROM Pokemon').get() as { total: number };
    return { data: rows.map(attachTypes), total };
  },

  findById(id: number): PokemonWithTypes | undefined {
    const row = db.prepare('SELECT * FROM Pokemon WHERE id = ?').get(id) as PokemonRow | undefined;
    if (!row) return undefined;
    return attachTypes(row);
  },

  findByTypeId(typeId: number): PokemonWithTypes[] {
    const rows = db
      .prepare(
        `SELECT p.* FROM Pokemon p
         JOIN PokemonPokemonType ppt ON ppt.pokemonId = p.id
         WHERE ppt.typeId = ?`
      )
      .all(typeId) as PokemonRow[];
    return rows.map(attachTypes);
  },
};
