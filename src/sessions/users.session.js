import User from '../class/models/user.class.js';
import { userSessions } from './sessions.js';

export const addUser = (socket, id, platerId, latency) => {
  const user = new User(socket, id, platerId, latency);
  userSessions.push(user);
  return user;
};

export const removeUser = (socket) => {
  const index = userSessions.findIndex((user) => user.socket === socket);
  if (index !== -1) {
    return userSessions.splice(index, 1)[0];
  }
};

export const getAllUser = () => {
  return userSessions;
};