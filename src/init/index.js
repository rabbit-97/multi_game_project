import { addGameSession } from '../sessions/game.session.js';
import { loadProtos } from './loadProto.js';
import { v4 as uuidv4 } from 'uuid';

const initServer = async () => {
  try {
    await loadProtos();
    const gameId = uuidv4();
    const gameSession = addGameSession(gameId);
    console.log(gameSession);
  } catch (error) {
    console.error('게임세션 생성 중 오류가 발생했습니다:', error);
    process.exit(1);
  }
};

export default initServer;
