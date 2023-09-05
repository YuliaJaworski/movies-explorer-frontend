import React from "react";
import './PageNotFound.css';
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
      <section className="not-found">
        <h2 className="not-found__text-number">404</h2>
        <h3 className="not-found__text">Страница не найдена</h3>
        <button onClick={goBack} className="not-found__back">Назад</button>
      </section>
  )
}

export default PageNotFound;