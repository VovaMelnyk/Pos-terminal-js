import Hall from '../components/hall/hall';

const API_KEY = 'AIzaSyAGvk2E4uRyoCWFdQk6TPKLuV_bcuNk29I';

const ERRORS = {
  EMAIL_EXISTS: 'Sorry, this email already exist',
  EMAIL_NOT_FOUND: 'Такой пользователь не найден',
  INVALID_PASSWORD: 'Неверный пароль',
};

export const authentication = (url, user) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  fetch(url + API_KEY, options)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        const error = document.querySelector('.error-box');
        error.textContent = ERRORS[data.error.message];
        return;
      }
      const root = document.querySelector('#root');
      root.innerHTML = '';
      new Hall().start(root);
      localStorage.setItem('token', data.idToken);
    })
    .catch(err => console.error(err));
};
