import { updateUserLocation } from '../db/user/user.db.js';
import { userSessions } from './sessions.js';

export const addUser = (user) => {
  userSessions.push(user);
  return user;
};

export const removeUser = async (socket) => {
  const index = userSessions.findIndex((user) => user.socket === socket);
  if (index !== -1) {
    const user = userSessions[index];
    await updateUserLocation(user.x, user.y, user.id);
    return userSessions.splice(index, 1)[0];
  }
};

export const getUserBySocket = (socket) => {
  const user = userSessions.find((user) => user.socket === socket);
  if (!user) {
    console.error('User not found : getUserBySocket');
  }
  return user;
};

export const getAllUser = () => {
  return userSessions;
};
