import React from "react";
import { useState } from "react";
import './SearchForm.css';

function SearchForm() {
  const [ isActive, setIsActive ] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  }

  return (
    <section className="search-form">
      <form className="search-form__search-bar">
        <input className="search-form__input" placeholder="Фильм" />
        <button className="search-form__button" />
      </form>
      <form className="search-form__short-film">
        <button onClick={handleClick} className={`search-form__button-short ${isActive ? '' : 'search-form__button-short_disactive'}`}>
          <div className={`search-form__button-round ${isActive ? "" : 'search-form__button-round_disactive'}`}></div>
        </button>
        <p className="search-form__name-button">Короткометражки</p>
      </form>
    </section>
  )
}

export default SearchForm;