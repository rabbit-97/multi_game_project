import { createPingPacket } from '../../utils/notification/game.notification.js';

export default class User {
  constructor(socket, id, playerId, latency, coords) {
    this.id = id;
    this.socket = socket;
    this.playerId = playerId;
    this.latency = latency;
    this.x = coords.x;
    this.y = coords.y;
    this.lastX = 0;
    this.lastY = 0;
    this.lastUpdateTime = Date.now();
    this.speed = 3;
  }

  updatePosition(x, y) {
    this.lastX = this.x;
    this.lastY = this.y;
    this.x = x;
    this.y = y;
    this.lastUpdateTime = Date.now();
  }

  ping() {
    const now = Date.now();

    console.log(`${this.id}: ping`);
    this.socket.write(createPingPacket(now));
  }

  handlePong(data) {
    const now = Date.now();
    this.latency = (now - data.timestamp) / 2;
    console.log(`${this.id}: pong, latency: ${this.latency}ms`);
  }

  calculatePosition(latency) {
    if (this.x === this.lastX && this.y === this.lastY) {
      return {
        x: this.x,
        y: this.y,
      };
    }

    const timeDiff = (Date.now() - this.lastUpdateTime + latency) / 1000;

    const distance = this.speed * timeDiff;

    const directionX = this.x !== this.lastX ? Math.sign(this.x - this.lastX) : 0;
    const directionY = this.y !== this.lastY ? Math.sign(this.y - this.lastY) : 0;

    return {
      x: this.lastX + distance * directionX,
      y: this.lastY + distance * directionY,
    };
  }
}
