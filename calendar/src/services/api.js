import axios from 'axios';

export const createUser = (firstName, lastName) => {
  const url = 'http://localhost:5000/api/createUser';
  const body = {
    firstName: firstName,
    lastName: lastName,
  };
  const headers = { 'Content-Type': 'application/json' };
  return axios
    .post(url, body, { headers })
    .then(() => {
      return Promise.resolve('User created');
    })
    .catch(error => {
      return Promise.reject('Error creating user', error);
    });
};
