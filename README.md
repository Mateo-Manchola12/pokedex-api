# Pokédex API

A RESTful Pokémon API built with TypeScript, Express, and SQLite.

## Tech Stack

- **Runtime**: Node.js + TypeScript
- **Framework**: Express
- **Database**: SQLite via better-sqlite3
- **Auth**: JWT + bcrypt
- **Validation**: Zod
- **Config**: dotenv

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
# Edit .env with your values
```

### 3. Seed the database

```bash
npm run seed
```

### 4. Start development server

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
npm start
```

## API Endpoints

### Auth

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| POST | `/auth/register` | Register a new user | No |
| POST | `/auth/login` | Login and receive JWT | No |

### Users

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| GET | `/users/me` | Get current user profile | Yes |

### Pokémon

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| GET | `/pokemon` | List all Pokémon (paginated) | No |
| GET | `/pokemon/:id` | Get a Pokémon by ID | No |
| GET | `/pokemon/type/:typeId` | Get Pokémon by type | No |

Query params for `/pokemon`: `page` (default: 1), `limit` (default: 20, max: 100)

### Types

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| GET | `/types` | List all Pokémon types | No |

### Teams

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| POST | `/teams` | Create a new team | Yes |
| GET | `/teams` | List user's teams | Yes |
| POST | `/teams/:id/pokemon` | Add Pokémon to team | Yes |
| DELETE | `/teams/:id/pokemon/:pokemonId` | Remove Pokémon from team | Yes |

## Authentication

Include the JWT token in the `Authorization` header:

```
Authorization: Bearer <your_token>
```

## Response Format

All responses follow this structure:

**Success:**
```json
{ "ok": true, "data": { ... } }
```

**Error:**
```json
{ "ok": false, "error": "Error message" }
```

## Examples

### Register

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "trainer@pokemon.com", "password": "pikachu123"}'
```

### Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "trainer@pokemon.com", "password": "pikachu123"}'
```

### List Pokémon

```bash
curl http://localhost:3000/pokemon?page=1&limit=10
```

### Create Team

```bash
curl -X POST http://localhost:3000/teams \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"name": "Dream Team"}'
```
