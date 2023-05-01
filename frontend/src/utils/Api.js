class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  // Проверка, всё ли в порядке с ответом
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка(статус): ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getUserInfo() {
    return this._request(`${this._url}/users/me`, {
      headers: this._headers,
    });
  }

  getAllCards() {
    return this._request(`${this._url}/cards`, {
      headers: this._headers,
    });
  }

  editProfile(data) {
    return this._request(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  addNewCard(data) {
    return this._request(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
  }

  deleteCard(_id) {
    return this._request(`${this._url}/cards/${_id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  addLike(_id) {
    return this._request(`${this._url}/cards/${_id}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  deleteLike(_id) {
    return this._request(`${this._url}/cards/${_id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  editAvatar(data) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }
}

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-58/",
  headers: {
    authorization: "8ec07323-384f-4707-a5b9-b183fdd7d129",
    "Content-type": "application/json",
  },
});

export default api;
