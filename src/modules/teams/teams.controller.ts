import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { teamsService } from './teams.service';
import { sendSuccess } from '../../shared/utils/response';

const createTeamSchema = z.object({ name: z.string().min(1) });
const addPokemonSchema = z.object({ pokemonId: z.number().int().positive() });

export const teamsController = {
  create(req: Request, res: Response, next: NextFunction): void {
    try {
      const { name } = createTeamSchema.parse(req.body);
      const userId = req.user!.userId;
      const team = teamsService.createTeam(userId, name);
      sendSuccess(res, team, 201);
    } catch (err) {
      next(err);
    }
  },

  list(req: Request, res: Response, next: NextFunction): void {
    try {
      const userId = req.user!.userId;
      const teams = teamsService.getTeams(userId);
      sendSuccess(res, teams);
    } catch (err) {
      next(err);
    }
  },

  addPokemon(req: Request, res: Response, next: NextFunction): void {
    try {
      const teamId = parseInt(req.params.id);
      if (isNaN(teamId)) {
        res.status(400).json({ ok: false, error: 'Invalid team id' });
        return;
      }
      const { pokemonId } = addPokemonSchema.parse(req.body);
      const userId = req.user!.userId;
      const entry = teamsService.addPokemonToTeam(teamId, pokemonId, userId);
      sendSuccess(res, entry, 201);
    } catch (err) {
      next(err);
    }
  },

  removePokemon(req: Request, res: Response, next: NextFunction): void {
    try {
      const teamId = parseInt(req.params.id);
      const pokemonId = parseInt(req.params.pokemonId);
      if (isNaN(teamId) || isNaN(pokemonId)) {
        res.status(400).json({ ok: false, error: 'Invalid id' });
        return;
      }
      const userId = req.user!.userId;
      teamsService.removePokemonFromTeam(teamId, pokemonId, userId);
      sendSuccess(res, { message: 'Pokemon removed from team' });
    } catch (err) {
      next(err);
    }
  },
};
