import { Router } from 'express';
import { typesController } from './types.controller';

const router = Router();

router.get('/', typesController.list);

export default router;
