import { Router } from 'express';
import { pokemonController } from './pokemon.controller';

const router = Router();

router.get('/type/:typeId', pokemonController.getByType);
router.get('/:id', pokemonController.getById);
router.get('/', pokemonController.list);

export default router;
