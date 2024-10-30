import Game from '../class/models/game.class.js';
import { gameSession } from './sessions.js';

export const addGameSession = (id) => {
  const session = new Game(id);
  gameSession.push(session);
  return session;
};

export const removeGameSession = () => {
  delete gameSession[0];
};

export const getGameSession = () => {
  return gameSession[0];
};
