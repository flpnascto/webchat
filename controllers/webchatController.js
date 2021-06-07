const User = require('../models/userModel');

const startSection = (_req, res) => {
  const users = User.getAllUsers();
  res.render('webchat.ejs', { users });
};

module.exports = {
  startSection,
};