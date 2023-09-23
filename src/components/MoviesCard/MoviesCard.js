import React from "react";
import './MoviesCard.css';

function MoviesCard({ filmImage, filmName, filmDuration, nameButton, textButton }) {
  function converterTime(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    return `${hours}ч${minutes}м`
  }

  return (
    <li className="card">
      <button className={`card__favorite card__favorite_field_${nameButton}`}>{textButton}</button>
      <img className="card__image" src={filmImage} alt="Обложка фильма"/>
      <div className="card__description">
        <p className="card__name">{filmName}</p>
        <p className="card__length">{converterTime(filmDuration)}</p>
      </div>
    </li>
  )
}

export default MoviesCard;