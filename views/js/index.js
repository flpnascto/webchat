const client = window.io();

const changeNicknameButton = document.getElementById('nickname-button');
changeNicknameButton.addEventListener('click', () => {
  const nicknameInput = document.getElementById('nickname-input');
  const updateNickname = nicknameInput.value;
  if (updateNickname !== '') client.emit('nicknameChange', updateNickname);
});

client.on('newUser', (user) => {
  const usersListUl = document.getElementById('users-list');
  const li = document.createElement('li');
  li.setAttribute('id', user.id);
  li.setAttribute('data-testid', 'online-user');
  li.innerText = user.nickname;
  usersListUl.appendChild(li);
});

const sendButton = document.getElementById('send-button');
sendButton.addEventListener('click', () => {
  const messageBoxInput = document.getElementById('message-box');
  const chatMessage = messageBoxInput.value;
  const nickname = document.getElementById(client.id).innerText;
  client.emit('message', ({ chatMessage, nickname }));
});

client.on('message', (message) => {
  const boardMessagesAside = document.getElementById('board-messages');
  const p = document.createElement('p');
  p.setAttribute('data-testid', 'message');
  p.innerHTML = message;
  boardMessagesAside.appendChild(p);
});

client.on('updateUser', (user) => {
  const li = document.getElementById(user.id);
  li.innerHTML = user.nickname;
});