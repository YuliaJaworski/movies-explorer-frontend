import React from "react";
import Form from "../Form/Form";

function Login({ handleLogin }) {
  const [ formValue, setFormValue ] = React.useState({
    email: "",
    password: ""
  })

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormValue({
      ...formValue,
      [name]: value,
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const { email, password } = formValue;

    handleLogin(email, password);
  }

  return (
    <Form 
      postscriptumName="Ещё не зарегистрированы? " 
      postscriptumNameLink="Регистрация" 
      buttonName="Войти"
      router="/signup"
      handleSubmit={handleSubmit}>
        <p className="form__input-name">E-mail</p>
        <input
          id="input-login-email"
          type="email"
          className="form__input"
          name="email"
          required
          onChange={handleChange}
        />
        <span id="input-login-name-error" className="form__span"></span>
        <p className="form__input-name">Пароль</p>
        <input
          id="input-login-password"
          type="password"
          className="form__input"
          name="password"
          required
          minLength="2"
          maxLength="40"
          onChange={handleChange}
        />
        <span id="input-login-password-error" className="form__span"></span>
    </Form>
  )
}

export default Login;