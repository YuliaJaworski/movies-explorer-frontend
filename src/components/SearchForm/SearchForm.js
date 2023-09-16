import React from "react";
import { useState } from "react";
import './SearchForm.css';

function SearchForm({ searchSubmit, searchMovie, searchChange }) {
  const [ isActive, setIsActive ] = useState(false);
  const [ isSubmit, setIsSubmit ] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    searchSubmit(evt);
    setIsSubmit(true);
  }

  return (
    <section className="search-form" aria-label="Форма поиска фильмов">
      <form className="search-form__search-bar" 
        action="URL" 
        method="post" 
        noValidate
        onSubmit={handleSubmit}>
          <div className="search-form__input-bar">
            <input className="search-form__input"
              id="input-films"
              type="text"
              placeholder="Фильм"
              name="email" 
              value={searchMovie}
              onChange={searchChange}/>
            <span id="input-search-error" className="search-form__span">{isSubmit && searchMovie === "" ? 'Нужно ввести ключевое слово' : ''}</span>
          </div>
          <button type="submit" className="search-form__button" />
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