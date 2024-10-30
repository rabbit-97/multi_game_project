import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from '../../constants/handlerId.js';
import { getGameSession } from '../../sessions/game.session.js';
import { addUser } from '../../sessions/users.session.js';
import { createResponse } from '../../utils/response/createResponse.js';

const initialHandler = ({ socket, userId, payload }) => {
  try {
    const { deviceId, latency, userId } = payload;
    const user = addUser(socket, deviceId, userId, latency);
    const gameSession = getGameSession();
    gameSession.addUser(user);

    const initialResponse = createResponse(HANDLER_IDS.INITIAL, RESPONSE_SUCCESS_CODE, {
      userId: deviceId,
    });

    socket.write(initialResponse);
  } catch (error) {
    console.error('Error handling packet:', error);
  }
};

export default initialHandler;
