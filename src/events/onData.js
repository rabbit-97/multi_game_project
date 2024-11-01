import { packetParser } from '../utils/parser/packetParser.js';
import { PACKET_TYPE, PACKET_TYPE_LENGTH, TOTAL_LENGTH } from '../constants/header.js';
import { getHandlerById } from '../handler/index.js';
import CustomError from '../utils/error/customError.js';
import { ErrorCodes } from '../utils/error/errorCodes.js';
import { getProtoMessages } from '../init/loadProto.js';

export const onData = (socket) => (data) => {
  socket.buffer = Buffer.concat([socket.buffer, data]);
  const totalHerderLength = TOTAL_LENGTH + PACKET_TYPE_LENGTH;

  while (socket.buffer.length > totalHerderLength) {
    const length = socket.buffer.readUInt32BE(0);
    const packetType = socket.buffer.readUInt8(TOTAL_LENGTH);

    if (socket.buffer.length >= length) {
      const packet = socket.buffer.subarray(totalHerderLength, length);
      socket.buffer = socket.buffer.subarray(length);

      try {
        switch (packetType) {
          case PACKET_TYPE.PING:
            {
              const protoMessages = getProtoMessages();
              const Ping = protoMessages.common.Ping;
              const pingMessage = Ping.decode(packet);
              const user = getUserBySocket(socket);
              if (!user) {
                throw new CustomError(ErrorCodes.USER_NOT_FOUND, '유저를 찾을 수 없습니다.');
              }
              // 클라이언트 코드 구현 실패
              // user.handlePong(pingMessage);
            }
            break;

          case PACKET_TYPE.NORMAL: {
            const { handlerId, userId, payload } = packetParser(packet);
            const handler = getHandlerById(handlerId);

            handler({ socket, userId, payload });
          }
        }
      } catch (error) {
        throw new CustomError(ErrorCodes.PACKET_DECODE_ERROR, error);
      }
    } else {
      break;
    }
  }
};
