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
          id="input-email"
          type="email"
          className="form__input"
          name="email"
          required
          value={'pochta@yandex.ru' || ""}
        />
        <span id="input-name-error" className="form__span"></span>
        <p className="form__input-name">Пароль</p>
        <input
          id="input-password"
          type="password"
          className="form__input"
          name="password"
          required
          minLength="2"
          maxLength="40"
          value={""}
        />
        <span id="input-name-error" className="form__span"></span>
    </Form>
  )
}

export default Login;