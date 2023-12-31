import React from "react";
import './Form.css';
import { Link } from "react-router-dom";

function Form({children, postscriptumName, postscriptumNameLink, buttonName, router, handleSubmit, isValid }) {
  return (
    <section>
      <form className="form" name="form__auth" action="URL" method="post" noValidate onSubmit={handleSubmit}>
        <div className="form__container">
          {children}
        </div>
        <div className="form__btn-container">
          <button className={`${isValid ? 'form__button' : 'form__button form__button_disactive'}`} disabled={!isValid}>{buttonName}</button>
          <h3 className="form__postscriptum">{postscriptumName} 
            <Link to={router} className="form__postscriptum-link">{postscriptumNameLink}</Link>
          </h3>
        </div>
      </form>
    </section>
  )
}

export default Form;