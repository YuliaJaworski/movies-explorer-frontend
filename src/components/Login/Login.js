import React from "react";
import Form from "../Form/Form";

function Login() {
  return (
    <Form 
      postscriptumName="Ещё не зарегистрированы? " 
      postscriptumNameLink="Регистрация" 
      buttonName="Войти"
      router="/signup">
        <p className="form__input-name">E-mail</p>
        <input
          id="input-login-email"
          type="email"
          className="form__input"
          name="email"
          required
          defaultValue={'pochta@yandex.ru' || ""}
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
          defaultValue={""}
        />
        <span id="input-login-password-error" className="form__span"></span>
    </Form>
  )
}

export default Login;