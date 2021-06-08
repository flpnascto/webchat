const randomName = require('node-random-name');

const onlineUsers = [];

const setRandomNickname = () => {
  let nickname = randomName({ first: true });
  while (nickname.length < 16) {
    nickname += '-';
    nickname += randomName({ last: true });
  }
  return nickname.slice(0, 16);
};

const addUser = (id) => {
  const nickname = setRandomNickname();
  const newUser = { id, nickname };
  onlineUsers.push(newUser);
  return newUser;
};

const getAllUsers = () => onlineUsers;

const getUserById = (id) => {
  const user = onlineUsers.find((e) => e.id === id);
  return user.nickname;
};

const updateUser = (id, nickname) => {
  const index = onlineUsers.findIndex((user) => user.id === id);
  const user = { id, nickname };
  onlineUsers[index] = user;
  return user;
};

const remove = (id) => {
  const index = onlineUsers.findIndex((user) => user.id === id);
  onlineUsers.splice(index, 1);
};

module.exports = {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  remove,
};