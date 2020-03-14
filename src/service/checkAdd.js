import Check from "../components/component-check/component-check";

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

  export const putCheck = (url, order) => {
    const options = {
      method: 'PUT',
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

  export const getCheckWithId = (url, id) => {
    fetch(url, id)
    .then(response => response.json())
    .then(data =>  console.log(data))
    .catch(err => console.error(err));
  }