import Database from 'better-sqlite3';
import dotenv from 'dotenv';

dotenv.config();

const DB_PATH = process.env.DATABASE_URL || './database.sqlite';

const db = new Database(DB_PATH);
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
    stats TEXT NOT NULL,
    attack TEXT NOT NULL,
    defense TEXT NOT NULL
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

const types: Array<{ id: number; name: string; color: string; iconUrl: string }> = require('./pokemon-types.json');
const pokemons: Array<{
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  generation: number;
  hp: number;
  stats: Record<string, number>;
  typeIds: number[];
  attack: string;
  defense: string;
}> = require('./pokemons.json');

const insertType = db.prepare(
  'INSERT OR REPLACE INTO PokemonType (id, name, color, iconUrl) VALUES (?, ?, ?, ?)'
);
const insertPokemon = db.prepare(
  'INSERT OR REPLACE INTO Pokemon (id, name, description, imageUrl, generation, hp, stats, attack, defense) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
);
const insertPokemonType = db.prepare(
  'INSERT OR REPLACE INTO PokemonPokemonType (pokemonId, typeId) VALUES (?, ?)'
);

const seedAll = db.transaction(() => {
  for (const t of types) {
    insertType.run(t.id, t.name, t.color, t.iconUrl);
  }
  console.log(`Seeded ${types.length} pokemon types`);

  for (const p of pokemons) {
    insertPokemon.run(p.id, p.name, p.description, p.imageUrl, p.generation, p.hp, JSON.stringify(p.stats), p.attack, p.defense);
    for (const typeId of p.typeIds) {
      insertPokemonType.run(p.id, typeId);
    }
  }
  console.log(`Seeded ${pokemons.length} pokemon`);
});

seedAll();
db.close();
console.log('Seeding complete!');
