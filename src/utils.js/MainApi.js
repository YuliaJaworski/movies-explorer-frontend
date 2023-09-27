class MainApi {
  constructor(config) {
    this._url = config.url;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //загрузка информации пользователя
  getUser(jwt) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        "content-type": "application/json", 
        Authorization: `Bearer ${jwt}`,
      },
      credentials: "include",
    }).then((res) => this._getResponseData(res));
  }

  //редактировать профиль пользователя
  updateUser(name, email, jwt) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json", 
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        name,
        email,
      }),
      credentials: "include",
    }).then((res) => this._getResponseData(res));
  }

  // загрузить сохраненные фильмы
  getSavedMovies(jwt) {
    return fetch(`${this._url}/movies`, {
      method: "GET",
      headers: {
        "content-type": "application/json", 
        Authorization: `Bearer ${jwt}`,
      },
      credentials: "include",
    }).then((res) => this._getResponseData(res));
  }
  
  // добавить фильм в сохраненные
  addMovies(
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    movieId,
    thumbnail,
    jwt) {
    return fetch(`${this._url}/movies`, {
      method: "POST",
      headers: {
        "content-type": "application/json", 
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        nameRU,
        nameEN,
        movieId,
        thumbnail,
      }),
      credentials: "include",
    }).then((res) => this._getResponseData(res));
  }

  // удалить фильм из сохраненных
  deleteMovies(id, jwt) {
    return fetch(`${this._url}/movies/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json", 
        Authorization: `Bearer ${jwt}`,
      },
      credentials: "include",
    }).then((res) => this._getResponseData(res));
  }

  register(name, email, password) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: {
        "content-type": "application/json", 
      },
      body: JSON.stringify({ name, email, password }),
      credentials: "include",
    }).then((res) => this._getResponseData(res));
  }

  login(email, password) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: {
        "content-type": "application/json", 
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    }).then((res) => this._getResponseData(res));
  }
}

const mainApi = new MainApi({
  url: 'https://api.movies-explorer-jj.nomoredomainsicu.ru',
});

export default mainApi;