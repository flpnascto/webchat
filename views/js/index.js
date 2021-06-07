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