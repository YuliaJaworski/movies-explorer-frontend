import React from "react";
import './Profile.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useLocation } from 'react-router-dom';

function Profile({ handleUpdateUser, signOut, serverError, dataConfirm, setDataConfirm, isEdit, setIsEdit }) {
  const currentUser = React.useContext(CurrentUserContext);
  
  const [ name, setName ] = React.useState();
  const [ email, setEmail ] = React.useState();
  const [ nameIsChange, setNameIsChange ] = React.useState(false); // состояние изменения инпута
  const [ emailIsChange, setEmailIsChange ] = React.useState(false);
  const [initialName, setInitialName] = React.useState('');
  const [initialEmail, setInitialEmail] = React.useState('');
  const [ emailError, setEmailError ] = React.useState('');
  const [ nameError, setNameError ] = React.useState('');
  const [ isValid, setIsValid ] = React.useState(false);
  const [ errorIsClear, setErrorIsClear ] = React.useState(false);

  const location = useLocation();
  
  React.useEffect(() => {
    if (nameError || emailError) {
      setIsValid(false);
    } else if (!nameIsChange && !emailIsChange) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [nameError, emailError, nameIsChange, emailIsChange]);

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
    setInitialName(currentUser.name);
    setInitialEmail(currentUser.email);
  }, [currentUser]);

  React.useEffect(() => {
    if (serverError) {
      setName(initialName);
      setErrorIsClear(false);
    } else {
      setErrorIsClear(true);
    }
  }, [serverError, initialName]);

  React.useEffect(() => {
    setDataConfirm(false);
  }, [location]);

  function handleUpdateUserName(evt) {
    console.log(evt.target.value !== initialName);
    setName(evt.target.value);
    setNameIsChange(evt.target.value !== initialName);
    const validatorName = /^[a-zA-Zа-яА-ЯёЁ\s-]{2,40}$/;
    if (!validatorName.test(String(evt.target.value).toLowerCase())) {
      setNameError('Некорректное имя');
      if (!evt.target.value) {
        setNameError('Имя не может быть пустым');
      }
    } else {
      setNameError('');
    }
  }

  function handleUpdateUserEmail(evt) {
    setEmail(evt.target.value);
    setEmailIsChange(evt.target.value !== initialEmail);
    const validatorEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!validatorEmail.test(String(evt.target.value).toLowerCase())) {
      setEmailError('Некорректный email');
      if (!evt.target.value) {
        setEmailError('Email не может быть пустым');
      }
    } else {
      setEmailError('');
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleUpdateUser(name, email);
    setNameIsChange(false);
    setEmailIsChange(false);
  }

  function handleClick() {
    if (!isEdit) {
      setIsEdit(true);
      setErrorIsClear(true);
      setDataConfirm(false);
    }
  }

  const buttonEditClassName = ` 
    ${(isValid) ? 'profile__save profile__save_active' : 'profile__save'}`;

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
          {(nameError) && <div id="input-edit-name" className="profile__error">{nameError}</div>}
          <ul className="profile__grid">
            <li className="profile__data">E-mail</li>
            <li className="profile__data">
              <input className="profile__data profile__user-data" 
              value={email || ''} 
              disabled={!isEdit}
              required
              id="input-change-email"
              type="email"
              name="email"
              onChange={handleUpdateUserEmail}/>
            </li>
          </ul>
          {(emailError) && <div className="profile__error">{emailError}</div>}
      </div>
      {isEdit && 
      (<>
        {!errorIsClear && <div className="profile__error">{serverError}</div>}
        <button type="submit" className={buttonEditClassName} disabled={!isValid}>Сохранить</button>
      </>)
      }
      </form>
      <div className="profile__button">
        {dataConfirm && <div className="profile__confirm">Данные изменены</div>}
        {!isEdit && <button className='profile__edit' onClick={handleClick}>Редактировать</button> }
        <button className="profile__exit" onClick={signOut}>{isEdit ? '' : 'Выйти из аккаунта'}</button>
      </div>
    </section>
    </div>
  )
}

export default Profile;