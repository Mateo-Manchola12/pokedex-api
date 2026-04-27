import Database, { Database as DatabaseType } from 'better-sqlite3';
import { env } from './env';

const db: DatabaseType = new Database(env.DATABASE_URL);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    createdAt TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS PokemonType (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    color TEXT NOT NULL,
    iconUrl TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS Pokemon (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    imageUrl TEXT NOT NULL,
    generation INTEGER NOT NULL,
    hp INTEGER NOT NULL,
    stats TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS PokemonPokemonType (
    pokemonId INTEGER NOT NULL,
    typeId INTEGER NOT NULL,
    PRIMARY KEY (pokemonId, typeId),
    FOREIGN KEY (pokemonId) REFERENCES Pokemon(id),
    FOREIGN KEY (typeId) REFERENCES PokemonType(id)
  );

  CREATE TABLE IF NOT EXISTS Team (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    name TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES User(id)
  );

  CREATE TABLE IF NOT EXISTS TeamPokemon (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    teamId INTEGER NOT NULL,
    pokemonId INTEGER NOT NULL,
    FOREIGN KEY (teamId) REFERENCES Team(id),
    FOREIGN KEY (pokemonId) REFERENCES Pokemon(id)
  );
`);

export default db;
