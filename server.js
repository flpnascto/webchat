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

  const newUser = await User.addUser(client.id);
  io.emit('newUser', newUser);

  client.on('sendMessage', (message) => {
    const date = moment().format('DD-MM-YYYY h:mm:ss A');
    const nickname = User.getUserById(client.id);
    const sendMessage = `${date} - ${nickname}: ${message}`;
    io.emit('reciveMessage', sendMessage);
  });

  client.on('nicknameChange', (nickname) => {
    const userUpdate = User.updateUser(client.id, nickname);
    io.emit('updateUser', userUpdate);
  });
});

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(`${__dirname}/views`));

app.get('/', Webchat.startSection);

http.listen(PORT, () => {
  console.log(`server listening port ${PORT}`);
});