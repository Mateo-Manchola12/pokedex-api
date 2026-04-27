import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof ZodError) {
    res.status(400).json({
      ok: false,
      error: err.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', '),
    });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({ ok: false, error: err.message });
    return;
  }

  console.error(err);
  res.status(500).json({ ok: false, error: 'Internal server error' });
}
