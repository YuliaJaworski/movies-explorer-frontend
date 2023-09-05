import React from "react";
import './Profile.css';

function Profile() {
  return (
    <main className="main-profile">
      <section className="profile">
        <h2 className="profile__title">Привет, Виталий!</h2>
        <ul className="profile__grid">
          <li className="profile__data">Имя</li>
          <li className="profile__data profile__user-data">Виталий</li>
        </ul>
        <ul className="profile__grid">
          <li className="profile__data">E-mail</li>
          <li className="profile__data profile__user-data">pochta@yandex.ru</li>
        </ul>
        <div className="profile__button">
          <button className="profile__edit">Редактировать</button>
          <button className="profile__exit">Выйти из аккаунта</button>
        </div>
      </section>
    </main>
  )
}

export default Profile;