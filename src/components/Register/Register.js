import React from "react";
import Form from "../Form/Form";
import * as auth from "../../utils.js/auth";

function Register({handleLogin}) {
  const [ password, setPassword ] = React.useState();
  const [ email, setEmail ] = React.useState();
  const [ name, setName ] = React.useState();
  const [ emailError, setEmailError ] = React.useState('');
  const [ passwordError, setPasswordError ] = React.useState('');
  const [ nameError, setNameError ] = React.useState('');
  const [ isValid, setIsValid ] = React.useState(false);
  const [ error, setError ] = React.useState('');
  const [ errorIsClear, setErrorIsClear ] = React.useState(false);

  React.useEffect(() => {
    if (passwordError || emailError || nameError) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [passwordError, emailError, nameError]);

  React.useEffect(() => {
    if (error) {
      setErrorIsClear(false);
    } else {
      setErrorIsClear(true);
    }
  }, [error]);

  const handleChangeEmail = (evt) => {
    setEmail(evt.target.value);
    const validatorEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!validatorEmail.test(String(evt.target.value).toLowerCase())) {
      setEmailError('Некорректный email');
      if (!evt.target.value) {
        setEmailError('Имя не может быть пустым');
      }
    } else {
      setEmailError('');
    }
  }

  const handleChangePassword = (evt) => {
    setPassword(evt.target.value);
    if (!evt.target.value) {
      setPasswordError('Поле с паролем должно быть заполнено');
    } else {
      setPasswordError('');
    }
  }

  const handleChangeName = (evt) => {
    setName(evt.target.value)
    const validatorName = /^[a-zA-Zа-яА-ЯёЁ\s-]{2,40}$/;
    if (!validatorName.test(String(evt.target.value).toLowerCase())) {
      setNameError('Некорректные данные');
      if (!evt.target.value) {
        setNameError('Имя не может быть пустым');
      }
    } else {
      setNameError('');
    }
  }

  const handleSubmit = (evt) => {
    setErrorIsClear(true);
    evt.preventDefault();
    auth
    .register(name, email, password)
    .then((res) => {
      handleLogin(email, password);
      setError('');
    })
    .catch(err => {
      if (err === 'Ошибка: 409') {
        setError('Пользователь с таким email уже существует.');
      } else {
        setError('При регистрации пользователя произошла ошибка');
      }
    });
  }

  return (
    <Form 
      postscriptumName="Уже зарегистрированы? " 
      postscriptumNameLink="Войти" 
      buttonName="Зарегистрироваться"
      router="/signin"
      handleSubmit={handleSubmit}
      isValid={isValid}
      >
        <p className="form__input-name">Имя</p>
        <input
          id="input-register-name"
          type="text"
          className="form__input"
          name="name"
          required
          minLength="2"
          maxLength="40"
          value={name || ''}
          onChange={handleChangeName}

        />
        {(nameError) && <div id="input-edit-name" className="profile__error">{nameError}</div>}
        <p className="form__input-name">E-mail</p>
        <input
          id="input-register-email"
          type="email"
          className="form__input"
          name="email"
          required
          minLength="2"
          maxLength="40"
          value={email || ''}
          onChange={handleChangeEmail}
        />
        {(emailError) && <div id="input-edit-name" className="profile__error">{emailError}</div>}
        <p className="form__input-name">Пароль</p>
        <input
          id="input-register-password"
          type="password"
          className="form__input"
          name="password"
          required
          minLength="2"
          maxLength="40"
          value={password || ''}
          onChange={handleChangePassword}
        />
        {(passwordError) && <div id="input-edit-name" className="profile__error">{passwordError}</div>}
        {!errorIsClear && <div id="input-edit-name" className="profile__error">{error}</div>}
    </Form>
  )
}

export default Register;