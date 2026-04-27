import { teamsRepository } from './teams.repository';
import { pokemonRepository } from '../pokemon/pokemon.repository';
import { AppError } from '../../shared/middlewares/errorHandler';

export const teamsService = {
  createTeam(userId: number, name: string) {
    return teamsRepository.create(userId, name);
  },

  getTeams(userId: number) {
    const teams = teamsRepository.findByUserId(userId);
    return teams.map((team) => {
      const teamPokemon = teamsRepository.getTeamPokemon(team.id);
      const pokemon = teamPokemon.map((tp) => pokemonRepository.findById(tp.pokemonId)).filter(Boolean);
      return { ...team, pokemon };
    });
  },

  addPokemonToTeam(teamId: number, pokemonId: number, userId: number) {
    const team = teamsRepository.findById(teamId);
    if (!team) throw new AppError('Team not found', 404);
    if (team.userId !== userId) throw new AppError('Forbidden', 403);

    const pokemon = pokemonRepository.findById(pokemonId);
    if (!pokemon) throw new AppError('Pokemon not found', 404);

    return teamsRepository.addPokemon(teamId, pokemonId);
  },

  removePokemonFromTeam(teamId: number, pokemonId: number, userId: number) {
    const team = teamsRepository.findById(teamId);
    if (!team) throw new AppError('Team not found', 404);
    if (team.userId !== userId) throw new AppError('Forbidden', 403);

    teamsRepository.removePokemon(teamId, pokemonId);
  },
};
