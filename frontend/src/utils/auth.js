//const BASE_URL = 'https://api.mesto-58.nomoredomains.monster';
//const BASE_URL = 'http://localhost:3001';
const BASE_URL = 'https://api.mesto.pakhomov.site';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Статус: ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export const register = ({ email, password }) => {
  return request(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
};

export const authorization = ({ email, password }) => {
  return request(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
};

export const validityToken = (tokenJWT) => {
  return request(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${tokenJWT}`,
    },
  });
};
