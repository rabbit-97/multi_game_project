import { packetParser } from '../utils/parser/packetParser.js';
import { PACKET_TYPE, PACKET_TYPE_LENGTH, TOTAL_LENGTH } from '../constants/header.js';

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
          case PACKET_TYPE.NORMAL: {
            const result = packetParser(packet);
            console.log('Parsed result:', result);
            break;
          }
        }
      } catch (error) {
        console.error('Error handling packet:', error);
      }
    } else {
      break;
    }
  }
};
