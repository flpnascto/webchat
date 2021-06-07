const express = require('express');
const moment = require('moment');

const PORT = 3000;

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const Webchat = require('./controllers/webchatController');
const User = require('./models/userModel');

io.on('connection', async (client) => {
  console.log(`client id: ${client.id} connected.`);

  await User.addUser(client.id);
  const users = await User.getAllUsers();
  io.emit('userList', users);

  client.on('message', (message) => {
    const date = moment().format('DD-MM-YYYY h:mm:ss A');
    const sendMessage = `${date} - ${message.nickname}: ${message.chatMessage}`;
    io.emit('message', sendMessage);
  });

  // client.on('nicknameChange', (nickname) => {
  //   const userUpdate = User.updateUser(nickname);
  //   io.emit('usersList', userUpdate);
  // });
});

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(`${__dirname}/views`));

app.get('/', Webchat.startSection);

http.listen(PORT, () => {
  console.log(`server listening port ${PORT}`);
});