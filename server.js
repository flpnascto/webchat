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
const Message = require('./models/messageModel');

io.on('connection', async (client) => {
  console.log(`client id: ${client.id} connected.`);

  const newUser = await User.addUser(client.id);
  client.emit('nickname', newUser);
  client.broadcast.emit('newUser', newUser);

  client.on('message', async ({ chatMessage, nickname }) => {
    const date = moment().format('DD-MM-YYYY h:mm:ss A');
    const sendMessage = `${date} - ${nickname}: ${chatMessage}`;
    io.emit('message', sendMessage);
    await Message.create(chatMessage, nickname);
  });

  client.on('nicknameChange', (nickname) => {
    const userUpdate = User.updateUser(client.id, nickname);
    io.emit('updateUser', userUpdate);
  });

  client.on('disconnect', async () => {
    await User.remove(client.id);
    io.emit('removeUser', client.id);
  });
});

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(`${__dirname}/views`));

app.get('/', Webchat.startSection);

http.listen(PORT, () => {
  console.log(`server listening port ${PORT}`);
});