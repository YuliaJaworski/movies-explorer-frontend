import React from "react";
import Form from "../Form/Form";

function Login({ handleLogin, serverError }) {
  const [ password, setPassword ] = React.useState();
  const [ email, setEmail ] = React.useState();
  const [ emailError, setEmailError ] = React.useState('');
  const [ passwordError, setPasswordError ] = React.useState('');
  const [ isValid, setIsValid ] = React.useState(false);
  const [ errorIsClear, setErrorIsClear ] = React.useState(false);

  React.useEffect(() => {
    if (passwordError || emailError) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [passwordError, emailError]);

  React.useEffect(() => {
    if (serverError) {
      setErrorIsClear(false);
    } else {
      setErrorIsClear(true);
    }
  }, [serverError]);

  const handleChangeEmail = (evt) => {
    setEmail(evt.target.value);
    const validatorEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!validatorEmail.test(String(evt.target.value).toLowerCase())) {
      setEmailError('Некорректный email');
      if (!evt.target.value) {
        setEmailError('Поле email должно быть заполнено');
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

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setErrorIsClear(true);
    handleLogin(email, password);
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
        />
        {(emailError) && <div id="input-edit-name" className="form__error">{emailError}</div>}
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
        />
        {(passwordError) && <div id="input-edit-name" className="form__error">{passwordError}</div>}
        {!errorIsClear && <div id="input-edit-name" className="form__error">{serverError}</div>}
    </Form>
  )
}

export default Login;