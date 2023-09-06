import React from "react";
import './Form.css';
import { Link } from "react-router-dom";

function Form({children, postscriptumName, postscriptumNameLink, buttonName, router }) {
  return (
    <section className="form">
      <div className="form__container">
        {children}
      </div>
      <div className="form__btn-container">
        <button className={`form__button`}>{buttonName}</button>
        <h3 className="form__postscriptum">{postscriptumName} 
          <Link to={router} className="form__postscriptum-link">{postscriptumNameLink}</Link>
        </h3>
      </div>
    </section>
  )
}

export default Form;