import { Request, Response, NextFunction } from 'express';
import { pokemonService } from './pokemon.service';
import { sendSuccess } from '../../shared/utils/response';

export const pokemonController = {
  list(req: Request, res: Response, next: NextFunction): void {
    try {
      const page = Math.max(1, parseInt(req.query.page as string) || 1);
      const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 20));
      const result = pokemonService.getPokemon(page, limit);
      sendSuccess(res, { ...result, page, limit });
    } catch (err) {
      next(err);
    }
  },

  getById(req: Request, res: Response, next: NextFunction): void {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ ok: false, error: 'Invalid pokemon id' });
        return;
      }
      const pokemon = pokemonService.getPokemonById(id);
      sendSuccess(res, pokemon);
    } catch (err) {
      next(err);
    }
  },

  getByType(req: Request, res: Response, next: NextFunction): void {
    try {
      const typeId = parseInt(req.params.typeId);
      if (isNaN(typeId)) {
        res.status(400).json({ ok: false, error: 'Invalid type id' });
        return;
      }
      const pokemon = pokemonService.getPokemonByType(typeId);
      sendSuccess(res, pokemon);
    } catch (err) {
      next(err);
    }
  },
};
