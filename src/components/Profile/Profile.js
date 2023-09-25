import React from "react";
import './Profile.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({ handleUpdateUser, signOut, serverError }) {
  const currentUser = React.useContext(CurrentUserContext);
  
  const [ name, setName ] = React.useState();
  const [ email, setEmail ] = React.useState();
  const [ isEdit, setIsEdit ] = React.useState(false);
  const [ nameIsChange, setNameIsChange ] = React.useState(false); // состояние изменения инпута
  const [ emailIsChange, setEmailIsChange ] = React.useState(false);
  const [initialName, setInitialName] = React.useState('');
  const [initialEmail, setInitialEmail] = React.useState('');
  const [ emailError, setEmailError ] = React.useState('');
  const [ nameError, setNameError ] = React.useState('');
  const [ nameDirty, setNameDirty ] = React.useState(false);
  const [ emailDirty, setEmailDirty ] = React.useState(false);
  const [ isValid, setIsValid ] = React.useState(false);
  const [ errorIsClear, setErrorIsClear ] = React.useState(false);
  const [ dataConfirm, setDataConfirm ] = React.useState(false);
  
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

  function handleUpdateUserName(evt) {
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
    if (isEdit) {
      handleUpdateUser(name, email);
      setIsEdit(false);
    }
    if (serverError) {
      setName(initialName);
    } else {
      setDataConfirm(true);
    }
  }

  function blurHandler(evt) {
    if (evt.target.name === 'name') {
      setNameDirty(true);
    } else if (evt.target.name === 'email') {
      setEmailDirty(true);
    }
  }

  function handleClick() {
    if (!isEdit) {
      setIsEdit(true);
      setErrorIsClear(true);
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
              onBlur={blurHandler}
              onChange={handleUpdateUserName} />
            </li>
          </ul>
          {(nameDirty && nameError) && <div id="input-edit-name" className="profile__error">{nameError}</div>}
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
              onBlur={blurHandler}
              onChange={handleUpdateUserEmail}/>
            </li>
          </ul>
          {(emailDirty && emailError) && <div className="profile__error">{emailError}</div>}
      </div>
      {isEdit && 
      <button type="submit" className={buttonEditClassName} disabled={!isValid}>Сохранить</button>
      }
      </form>
      <div className="profile__button">
        {!errorIsClear && <div className="profile__error">{serverError}</div>}
        {dataConfirm && <div className="profile__confirm">Данные изменены</div>}
        {!isEdit && <button className='profile__edit' onClick={handleClick}>Редактировать</button> }
        <button className="profile__exit" onClick={signOut}>{isEdit ? '' : 'Выйти из аккаунта'}</button>
      </div>
    </section>
    </div>
  )
}

export default Profile;