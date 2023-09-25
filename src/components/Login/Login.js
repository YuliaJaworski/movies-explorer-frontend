import React from "react";
import Form from "../Form/Form";

function Login({ handleLogin, serverError }) {
  const [ password, setPassword ] = React.useState();
  const [ email, setEmail ] = React.useState();
  const [ emailError, setEmailError ] = React.useState('Email не может быть пустым');
  const [ passwordError, setPasswordError ] = React.useState('Имя не может быть пустым');
  const [ passwordDirty, setPasswordDirty ] = React.useState(false);
  const [ emailDirty, setEmailDirty ] = React.useState(false);
  const [ isValid, setIsValid ] = React.useState(false);
  const [ errorIsClear, setErrorIsClear ] = React.useState(false);

  React.useEffect(() => {
    if (passwordError || emailError) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [passwordError, emailError]);

  const handleChangeEmail = (evt) => {
    setEmail(evt.target.value);
    const validatorEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!validatorEmail.test(String(evt.target.value).toLowerCase())) {
      setEmailError('Некорректный email');
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

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin(email, password);
  }

  function blurHandler(evt) {
    if (evt.target.name === 'password') {
      setPasswordDirty(true);
      setErrorIsClear(true);
    } else if (evt.target.name === 'email') {
      setEmailDirty(true);
      setErrorIsClear(true);
    }
  }

  return (
    <Form 
      postscriptumName="Ещё не зарегистрированы? " 
      postscriptumNameLink="Регистрация" 
      buttonName="Войти"
      router="/signup"
      handleSubmit={handleSubmit}
      isValid={isValid}>
        <p className="form__input-name">E-mail</p>
        <input
          id="input-login-email"
          type="email"
          className="form__input"
          name="email"
          value={email || ''}
          required
          onChange={handleChangeEmail}
          onBlur={blurHandler}
        />
        {(emailDirty && emailError) && <div id="input-edit-name" className="form__error">{emailError}</div>}
        <p className="form__input-name">Пароль</p>
        <input
          id="input-login-password"
          type="password"
          className="form__input"
          name="password"
          required
          minLength="2"
          maxLength="40"
          value={password || ''}
          onChange={handleChangePassword}
          onBlur={blurHandler}
        />
        {(passwordDirty && passwordError) && <div id="input-edit-name" className="form__error">{passwordError}</div>}
        {!errorIsClear && <div id="input-edit-name" className="form__error">{serverError}</div>}
    </Form>
  )
}

export default Login;