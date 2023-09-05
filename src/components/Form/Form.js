import React from "react";
import './Form.css';
import { Link } from "react-router-dom";

function Form({children, postscriptumName, postscriptumNameLink, buttonName, router, name}) {
  return (
    <main className="main-profile">
      <section className="form">
        {children}
        <button className={`form__button form__button_type_${name}`}>{buttonName}</button>
        <h3 className="form__postscriptum">{postscriptumName} 
          <Link to={router} className="form__postscriptum-link">{postscriptumNameLink}</Link>
        </h3>
      </section>
    </main>
  )
}

export default Form;