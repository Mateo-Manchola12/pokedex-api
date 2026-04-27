import db from '../../config/database';

export interface TeamRow {
  id: number;
  userId: number;
  name: string;
}

export interface TeamPokemonRow {
  id: number;
  teamId: number;
  pokemonId: number;
}

export const teamsRepository = {
  create(userId: number, name: string): TeamRow {
    const stmt = db.prepare('INSERT INTO Team (userId, name) VALUES (?, ?)');
    const result = stmt.run(userId, name);
    return db.prepare('SELECT * FROM Team WHERE id = ?').get(result.lastInsertRowid) as TeamRow;
  },

  findByUserId(userId: number): TeamRow[] {
    return db.prepare('SELECT * FROM Team WHERE userId = ?').all(userId) as TeamRow[];
  },

  findById(id: number): TeamRow | undefined {
    return db.prepare('SELECT * FROM Team WHERE id = ?').get(id) as TeamRow | undefined;
  },

  addPokemon(teamId: number, pokemonId: number): TeamPokemonRow {
    const stmt = db.prepare('INSERT INTO TeamPokemon (teamId, pokemonId) VALUES (?, ?)');
    const result = stmt.run(teamId, pokemonId);
    return db.prepare('SELECT * FROM TeamPokemon WHERE id = ?').get(result.lastInsertRowid) as TeamPokemonRow;
  },

  removePokemon(teamId: number, pokemonId: number): void {
    db.prepare('DELETE FROM TeamPokemon WHERE teamId = ? AND pokemonId = ?').run(teamId, pokemonId);
  },

  getTeamPokemon(teamId: number): TeamPokemonRow[] {
    return db.prepare('SELECT * FROM TeamPokemon WHERE teamId = ?').all(teamId) as TeamPokemonRow[];
  },
};
