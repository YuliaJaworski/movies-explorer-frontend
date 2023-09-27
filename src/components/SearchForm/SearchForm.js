import React from "react";
import { useState } from "react";
import './SearchForm.css';

function SearchForm({ searchSubmit, searchMovie, searchChange, filterShortMovies, movies, filter,
  setSearchShortFilmIsActive, searchIsActive, isMovies, buttonMoviesIsActive, setButtonMoviesIsActive }) {
  const [ isActive, setIsActive ] = useState(false);
  const [ isSubmit, setIsSubmit ] = useState(false);

  const filterMovies = localStorage.getItem('filterShortMovies');

  const handleClick = () => {
    if (isMovies) {
      if (filterMovies) {
        setButtonMoviesIsActive(false);
      } else {
        setButtonMoviesIsActive(true);
      }
    } else {
      setIsActive(!isActive);
    }
  }

  const handleSortSavedMoviesSubmit = (evt) => {
    evt.preventDefault();
    if (isActive) {
      if (searchIsActive) {
        filterShortMovies(filter);
      } else {
        filterShortMovies(movies);
      }
    } else {
      setSearchShortFilmIsActive(false);
    }
  }

  const handleSortMoviesSubmit = (evt) => {
    evt.preventDefault();
    if (buttonMoviesIsActive) {
      if (searchIsActive) {
        filterShortMovies(filter);
      } else {
        filterShortMovies(movies);
      }
    } else {
      setSearchShortFilmIsActive(false);
      localStorage.removeItem('filterShortMovies');
    }
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
      <form className="search-form__short-film"  
        noValidate
        onSubmit={isMovies ? handleSortMoviesSubmit : handleSortSavedMoviesSubmit}>
        <button type="submit" onClick={handleClick} className={`search-form__button-short ${(isMovies ? filterMovies : isActive) ? '' : 'search-form__button-short_disactive'}`}>
          <span className={`search-form__button-round ${(isMovies ? filterMovies : isActive) ? "" : 'search-form__button-round_disactive'}`}></span>
        </button>
        <p className="search-form__name-button">Короткометражки</p>
      </form>
    </section>
  )
}

export default SearchForm;