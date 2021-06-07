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

// const updateUser = (username) => {
//   const index = onlineUsers.findIndex((user) => user === username);
//   onlineUsers[index] = username;
//   return onlineUsers;
// };

module.exports = {
  addUser,
  getAllUsers,
  // updateUser,
};