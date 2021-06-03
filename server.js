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

io.on('connection', (client) => {
  console.log(`client id: ${client.id} connected.`);

  client.on('message', (message) => {
    const date = moment().format('DD-MM-YYYY h:mm:ss A');
    const sendMessage = `${date} - ${message.nickname}: ${message.chatMessage}`;
    io.emit('message', sendMessage);
  });
});

http.listen(PORT, () => {
  console.log(`server listening port ${PORT}`);
});