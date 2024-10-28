import net from 'net';
import { HOST, PORT } from './constants/env.js';
import { onConnection } from './events/onConnection.js';
import initServer from './init/index.js';

const server = net.createServer(onConnection);

initServer()
  .then(() => {
    server.listen(PORT, HOST, () => {
      console.log(`Server is running at ${HOST}:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
