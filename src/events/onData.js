import { packetParser } from '../utils/parser/packetParser.js';
import { PACKET_TYPE, PACKET_TYPE_LENGTH, TOTAL_LENGTH } from '../constants/header.js';

export const onData = (socket) => (data) => {
  console.log('Received data:', data);

  socket.buffer = Buffer.concat([socket.buffer, data]);
  const totalHerderLength = TOTAL_LENGTH + PACKET_TYPE_LENGTH;
  console.log('Buffer:', socket.buffer);

  while (socket.buffer.length > totalHerderLength) {
    const length = socket.buffer.readUInt32BE(0);
    const packetType = socket.buffer.readUInt8(TOTAL_LENGTH);

    console.log('Packet length:', length);
    console.log('Packet type:', packetType);

    if (socket.buffer.length >= length) {
      const packet = socket.buffer.subarray(totalHerderLength, length);
      socket.buffer = socket.buffer.subarray(length);

      console.log('Packet data:', packet);

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
