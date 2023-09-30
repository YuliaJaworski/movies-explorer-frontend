export const url = "https://api.movies-explorer-jj.nomoredomainsicu.ru";

export const register = (name, email, password) => {
  return fetch(`${url}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
    credentials: "include",
  }).then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
};

export const login = (email, password) => {
  return fetch(`${url}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  }).then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
};