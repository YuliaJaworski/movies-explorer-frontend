import React from "react";
import Form from "../Form/Form";
import mainApi from "../../utils.js/MainApi";

function Register({handleLogin}) {
  const [ formValue, setFormValue ] = React.useState({
    name: "",
    email: "", 
    password: "",
  })

  function handleChange(evt) {
    const {name, value} = evt.target;

    setFormValue({ ...formValue, [name]: value });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const { name, email, password } = formValue;
    mainApi
      .register(name, email, password)
      .then((res) => {
        handleLogin(email, password);
      })
      .catch((err) => console.log(err));
  }

  return (
    <Form 
      postscriptumName="Уже зарегистрированы? " 
      postscriptumNameLink="Войти" 
      buttonName="Зарегистрироваться"
      router="/signin"
      handleSubmit={handleSubmit}
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
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
        />
        <span id="input-register-password-error" className="form__span"></span>
    </Form>
  )
}

export default Register;