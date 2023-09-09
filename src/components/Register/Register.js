import React from "react";
import Form from "../Form/Form";

function Register() {
  return (
    <Form 
      postscriptumName="Уже зарегистрированы? " 
      postscriptumNameLink="Войти" 
      buttonName="Зарегистрироваться"
      router="/signin"
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
          defaultValue={'Виталий' || ""}
        />
        <span id="input-register-name-error" className="form__span"></span>
        <p className="form__input-name">E-mail</p>
        <input
          id="input-register-email"
          type="email"
          className="form__input"
          name="email"
          required
          minLength="2"
          maxLength="40"
          defaultValue={'pochta@yandex.ru' || ""}
        />
        <span id="input-register-email-error" className="form__span"></span>
        <p className="form__input-name">Пароль</p>
        <input
          id="input-register-password"
          type="password"
          className="form__input"
          name="password"
          required
          minLength="2"
          maxLength="40"
          defaultValue={"1234567"}
        />
        <span id="input-register-password-error" className="form__span"></span>
    </Form>
  )
}

export default Register;