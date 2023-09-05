import React from "react";
import './MoviesCardList.css';

function MoviesCardList({ children }) {
  return (
    <section className="cards">
      <ul className="cards__container">
        {children}
      </ul>
    </section>
  )
}

export default MoviesCardList;