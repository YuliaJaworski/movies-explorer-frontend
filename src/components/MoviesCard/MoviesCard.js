import React from "react";
import './MoviesCard.css';

function MoviesCard({ filmImage, filmName, filmDuration }) {
  return (
    <li className="card">
      <button className="card__favorite" />
      <img className="card__image" src={filmImage} alt="Обложка фильма"/>
      <div className="card__description">
        <p className="card__name">{filmName}</p>
        <p className="card__length">{filmDuration}</p>
      </div>
    </li>
  )
}

export default MoviesCard;