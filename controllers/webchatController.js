const User = require('../models/userModel');
const Message = require('../models/messageModel');

const startSection = async (_req, res) => {
  const users = User.getAllUsers();
  const messages = await Message.findAll();
  res.render('webchat.ejs', { users, messages });
};

module.exports = {
  startSection,
};