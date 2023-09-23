import React from "react";
import './Profile.css';

function Profile({ userInfo }) {
  console.log(userInfo);
  return (
    <div className="main-profile">
    <section className="profile">
      <div className="profile__container">
        <h2 className="profile__title">Привет, Виталий!</h2>
        <form name="form__profile" action="URL" method="post" noValidate>
          <ul className="profile__grid">
            <li className="profile__data">Имя</li>
            <li className="profile__data">
              <input className="profile__data profile__user-data" 
              value={userInfo.name} 
              disabled
              id="input-change-name"
              type="text"
              name="name" />
            </li>
          </ul>
          <ul className="profile__grid">
            <li className="profile__data">E-mail</li>
            <li className="profile__data">
              <input className="profile__data profile__user-data" 
              value={userInfo.email} 
              disabled 
              id="input-change-email"
              type="email"
              name="email"/>
            </li>
          </ul>
        </form>
      </div>
      <div className="profile__button">
        <button className="profile__edit">Редактировать</button>
        <button className="profile__exit">Выйти из аккаунта</button>
      </div>
    </section>
    </div>
  )
}

export default Profile;