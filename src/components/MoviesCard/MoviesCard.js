import React from "react";
import './MoviesCard.css';


function MoviesCard({ movie, filmImage, filmName, filmDuration, trailer, handleDeleteMovie, isMovies, isSavedMovies, changeMovieStatus, savedMovies }) {
  function converterTime(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    return `${hours}ч${minutes}м`
  }

  // isMovies && isLiked = savedMovies.some((element) => element.movieId === movie.id);


  const handleChangeMovieStatus = () => {
    if (isMovies) {
      changeMovieStatus(movie);
    } else {
      handleDeleteMovie(movie);
    }
  }

  const cardButtonClassName = `card__favorite 
    ${isMovies && (savedMovies.some((element) => element.movieId === movie.id) ? 'card__favorite_field_save' : 'card__favorite_field_add-film')} 
    ${isSavedMovies && "card__favorite_field_delete"}`

  return (
    <li className="card">
      <button type="button" className={cardButtonClassName} onClick={handleChangeMovieStatus}>{isMovies && (savedMovies.some((element) => element.movieId === movie.id) ? '' : 'Сохранить')}</button>
      <a href={trailer} target="_blank" rel="noopener noreferrer"><img className="card__image" src={filmImage} alt="Обложка фильма"/></a>
      <div className="card__description">
        <p className="card__name">{filmName}</p>
        <p className="card__length">{converterTime(filmDuration)}</p>
      </div>
    </li>
  )
}

export default MoviesCard;