import React from "react";
import './Profile.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({ handleUpdateUser, signOut }) {
  const currentUser = React.useContext(CurrentUserContext);
  
  const [ name, setName ] = React.useState();
  const [ email, setEmail ] = React.useState();
  const [ isEdit, setIsEdit ] = React.useState(false);
  const [ nameIsChange, setNameIsChange ] = React.useState(false);
  const [ emailIsChange, setEmailIsChange ] = React.useState(false);
  const [initialName, setInitialName] = React.useState('');
  const [initialEmail, setInitialEmail] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
    setInitialName(currentUser.name);
    setInitialEmail(currentUser.email);
  }, [currentUser]);

  function handleUpdateUserName(evt) {
    setName(evt.target.value);
    setNameIsChange(evt.target.value !== initialName);
  }

  function handleUpdateUserEmail(evt) {
    setEmail(evt.target.value);
    setEmailIsChange(evt.target.value !== initialEmail);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isEdit) {
      handleUpdateUser(name, email);
      setIsEdit(false);
    }
  }

  function handleClick() {
    if (!isEdit) {
      setIsEdit(true);
    }
  }

  const buttonEditClassName = ` 
    ${(nameIsChange || emailIsChange) ? 'profile__save profile__save_active' : 'profile__save'}`;

  return (
    <div className="main-profile">
    <section className="profile">
    <form className="profile__form" name="form__profile" action="URL" method="post" onSubmit={handleSubmit} noValidate>
      <div className="profile__container">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
          <ul className="profile__grid">
            <li className="profile__data">Имя</li>
            <li className="profile__data">
              <input className="profile__data profile__user-data" 
              value={name || ''} 
              disabled={!isEdit}
              id="input-change-name"
              required
              type="text"
              name="name"
              onChange={handleUpdateUserName} />
            </li>
          </ul>
          <ul className="profile__grid">
            <li className="profile__data">E-mail</li>
            <li className="profile__data">
              <input className="profile__data profile__user-data" 
              defaultValue={email || ''} 
              disabled={!isEdit}
              required
              id="input-change-email"
              type="email"
              name="email"
              onChange={handleUpdateUserEmail}/>
            </li>
          </ul>
      </div>
      {isEdit && 
      <button type="submit" className={buttonEditClassName} disabled={!nameIsChange && !emailIsChange}>Сохранить</button>
      }
      </form>
      <div className="profile__button">
        {!isEdit && <button className='profile__edit' onClick={handleClick}>Редактировать</button> }
        <button className="profile__exit" onClick={signOut}>{isEdit ? '' : 'Выйти из аккаунта'}</button>
      </div>
    </section>
    </div>
  )
}

export default Profile;