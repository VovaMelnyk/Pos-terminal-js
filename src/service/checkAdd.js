import Check from "../components/component-check/component-check";



// const ERRORS = {
//     EMAIL_EXISTS: 'Sorry, this email already exist',
//     EMAIL_NOT_FOUND: 'Такой пользователь не найден',
//     INVALID_PASSWORD: 'Неверный пароль',
//   };
  
  export const postCheck = (url, order) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    fetch(url, options)
      .then(response => response.json())
      .then(data =>  console.log(data))
      .catch(err => console.error(err));
  };