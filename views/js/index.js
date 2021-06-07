const client = window.io();

const changeNicknameButton = document.getElementById('nickname-button');
changeNicknameButton.addEventListener('click', () => {
  const nicknameInput = document.getElementById('nickname-input');
  const updateNickname = nicknameInput.value;
  if (updateNickname !== '') client.emit('nicknameChange', updateNickname);
});

client.on('userList', (users) => {
  const usersListUl = document.getElementById('users-list');
  users.forEach((user) => {
    const li = document.createElement('li');
    li.setAttribute('id', user.id);
    li.setAttribute('data-testid', 'online-user');
    li.innerText = user.nickname;
    usersListUl.appendChild(li);
  });
});

const sendButton = document.getElementById('send-button');
sendButton.addEventListener('click', () => {
  const messageBoxInput = document.getElementById('message-box');
  const message = messageBoxInput.value;
  client.emit('sendMessage', message);
});

client.on('reciveMessage', (message) => {
  const boardMessagesAside = document.getElementById('board-messages');
  const p = document.createElement('p');
  p.setAttribute('data-testid', 'message');
  p.innerHTML = message;
  boardMessagesAside.appendChild(p);
});