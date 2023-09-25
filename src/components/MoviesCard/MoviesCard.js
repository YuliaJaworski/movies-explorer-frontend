import React from "react";
import './MoviesCard.css';


function MoviesCard({ movie, filmImage, filmName, filmDuration, changeCardStatus, isMovies, isSavedMovies }) {
  const [ buttonSaveIsActive, setButtonSaveIsActive ] = React.useState(false);

  function converterTime(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    return `${hours}ч${minutes}м`
  }

  React.useEffect(() => {
    const statusSave = localStorage.getItem(movie.id);
    console.log(statusSave, movie);
    if (statusSave === 'true') {
      setButtonSaveIsActive(true);
    } else {
      setButtonSaveIsActive(false);
    }
  }, [movie]);

  const handleChangeMovieStatus = () => {
    if (isMovies) {
      if (!buttonSaveIsActive) {
        changeCardStatus(movie);
        setButtonSaveIsActive(true);
      }
    } else {
      changeCardStatus(movie);
    }
  }

  const cardButtonClassName = `card__favorite 
    ${isMovies && (buttonSaveIsActive ? 'card__favorite_field_save' : 'card__favorite_field_add-film')} 
    ${isSavedMovies && "card__favorite_field_delete"}`

  return (
    <li className="card">
      <button type="button" className={cardButtonClassName} onClick={handleChangeMovieStatus}>{isMovies && (buttonSaveIsActive ? '' : 'Сохранить')}</button>
      <img className="card__image" src={filmImage} alt="Обложка фильма"/>
      <div className="card__description">
        <p className="card__name">{filmName}</p>
        <p className="card__length">{converterTime(filmDuration)}</p>
      </div>
    </li>
  )
}

export default MoviesCard;