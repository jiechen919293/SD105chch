// close the open user todo list

const userListEl = document.getElementById('user-list');

const getData = (url) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();

    request.addEventListener('readystatechange', () => {
      if (request.readyState === 4 && request.status === 200) {
        resolve(JSON.parse(request.responseText));
      } else if (request.readyState === 4) {
        reject('something went wrong');
      }
    });
    request.open('GET', url);
    request.send();
  });
};

const createUserList = (userData) => {
  userData.forEach((user) => {
    userListEl.insertAdjacentHTML(
      'beforeend',
      `<li data-user-id=${user.id}>${user.name}</li>`
    );
  });
};

const createTodoList = (todoData) => {
  const todoListEl = document.createElement('UL');
  todoData.forEach((todo) => {
    todoListEl.insertAdjacentHTML('beforeend', `<li>${todo.title}</li>`);
  });
  return todoListEl;
};

getData('https://jsonplaceholder.typicode.com/users')
  .then((data) => {
    createUserList(data);
  })
  .catch((err) => {
    userListEl.insertAdjacentHTML('beforeend', `<li>No Data</li>`);
  });

userListEl.addEventListener('click', (event) => {
  if (event.target.nodeName === 'LI') {
    const userId = event.target.dataset.userId;
    getData(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
      .then((data) => createTodoList(data)) // returns a todoListEl
      .then((todoList) => event.target.appendChild(todoList));
  }
});
