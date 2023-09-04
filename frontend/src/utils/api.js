class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;

  }

  //Загрузка информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._url}/users/me`, { headers: this._headers })
      .then((res) => this._checkServerResponse(res));
  }

  //Загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, { headers: this._headers })
      .then((res) => this._checkServerResponse(res));
  }

  //Редактирование профиля
  editUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.job
      })
    })
      .then((res) => this._checkServerResponse(res));
  }

  //Добавление новой карточки
  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then((res) => this._checkServerResponse(res));
  }

  //Удаление карточки
  deleteCard(cardID) {
    return fetch(`${this._url}/cards/${cardID}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then((res) => this._checkServerResponse(res));
  }

  //Обновление аватара пользователя
  editAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then((res) => this._checkServerResponse(res));
  }

  //Постановка лайка
  setLike(cardID) {
    return fetch(`${this._url}/cards/${cardID}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then((res) => this._checkServerResponse(res));
  }

  //Снятие лайка
  deleteLike(cardID) {
    return fetch(`${this._url}/cards/${cardID}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((res) => this._checkServerResponse(res));
  }


  _checkServerResponse(res) {
    //Проверка ответа сервера
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис 
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.setLike(cardId);
    } else {
      return this.deleteLike(cardId);
    }
  }

}

 



const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '7ec07678-8c6d-40ed-9548-222c1487bc48',
    'Content-Type': 'application/json'
  }
});

export default api;
