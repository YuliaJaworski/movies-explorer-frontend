import React from "react";

function Preloader({ clickMoreLoad, visibleMovies, movies }) {
  return (
    <section className={`card-load ${visibleMovies > movies.length ? 'card-load_block' : ''}`} aria-label="Загрузить ещё фильмы">
      <button className="card-load__button" onClick={clickMoreLoad}>Ещё</button>
    </section>
  )
}

export default Preloader;