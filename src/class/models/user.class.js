export default class User {
  constructor(socket, id, platerId, latency) {
    this.id = id;
    this.socket = socket;
    this.platerId = platerId;
    this.latency = latency;
    this.x = 0;
    this.y = 0;
    this.lastUpdateTime = Date.now();
  }
  updatePosition(x, y) {
    this.x = x;
    this.y = y;
    this.laastUpdateTime = Date.now();
  }
}
