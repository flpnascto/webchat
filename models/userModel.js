const randomName = require('node-random-name');

const onlineUsers = [];

const setRandomNinckname = () => {
  let nickname = randomName({ first: true });
  while (nickname.length < 16) {
    nickname += '-';
    nickname += randomName({ last: true });
  }
  return nickname.slice(0, 16);
};

const addUser = (id) => {
  const nickname = setRandomNinckname();
  onlineUsers.push({ id, nickname });
  return nickname;
};

const getAllUsers = () => onlineUsers;

const getUserById = (id) => {
  const user = onlineUsers.find((e) => e.id === id);
  return user.nickname;
};

// const updateUser = (username) => {
//   const index = onlineUsers.findIndex((user) => user === username);
//   onlineUsers[index] = username;
//   return onlineUsers;
// };

module.exports = {
  addUser,
  getAllUsers,
  getUserById,
  // updateUser,
};