import { Router } from 'express';
import { teamsController } from './teams.controller';
import { verifyToken } from '../auth/auth.middleware';

const router = Router();

router.use(verifyToken);

router.post('/', teamsController.create);
router.get('/', teamsController.list);
router.post('/:id/pokemon', teamsController.addPokemon);
router.delete('/:id/pokemon/:pokemonId', teamsController.removePokemon);

export default router;
