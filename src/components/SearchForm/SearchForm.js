import React from "react";
import { useState } from "react";
import './SearchForm.css';

function SearchForm() {
  const [ isActive, setIsActive ] = useState(true);

  const handleClick = () => {
    setIsActive(!isActive);
  }

  return (
    <section className="search-form" aria-label="Форма поиска фильмов">
      <form className="search-form__search-bar" action="URL" method="post" noValidate>
        <input className="search-form__input"
          id="input-films"
          type="text"
          placeholder="Фильм"
          name="email" />
        <button className="search-form__button" />
      </form>
      <form className="search-form__short-film">
        <button type="button" onClick={handleClick} className={`search-form__button-short ${isActive ? '' : 'search-form__button-short_disactive'}`}>
          <span className={`search-form__button-round ${isActive ? "" : 'search-form__button-round_disactive'}`}></span>
        </button>
        <p className="search-form__name-button">Короткометражки</p>
      </form>
    </section>
  )
}

export default SearchForm;