import { Request, Response, NextFunction } from 'express';
import { typesService } from './types.service';
import { sendSuccess } from '../../shared/utils/response';

export const typesController = {
  list(_req: Request, res: Response, next: NextFunction): void {
    try {
      const types = typesService.getAll();
      sendSuccess(res, types);
    } catch (err) {
      next(err);
    }
  },
};
