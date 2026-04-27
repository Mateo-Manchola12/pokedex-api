import { Request, Response, NextFunction } from 'express';
import { usersService } from './users.service';
import { sendSuccess } from '../../shared/utils/response';

export const usersController = {
  getMe(req: Request, res: Response, next: NextFunction): void {
    try {
      const userId = req.user!.userId;
      const user = usersService.getById(userId);
      sendSuccess(res, user);
    } catch (err) {
      next(err);
    }
  },
};
