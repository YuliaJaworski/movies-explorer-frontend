import React from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Loader from "../Loader/Loader";

function Movies({ movies, isLoading, isSave, handleMoreLoad, visibleMovies, shortFilm, filterShortMovies, searchShortFilmIsActive, setSearchShortFilmIsActive }) {
  const [ filter, setFilter ] = React.useState([]); // найденные фильмы
  // отслеживать показ фильмов из массива или фильтрованных фильмов
  const [ searchIsActive, setSearchIsActive ] = React.useState(false);
  // отслеживать состояние страницы по время поиска фильмов
  const [ searchIsChanging, setSearchIsChanging ] = React.useState(false);
  const [ searchMovie, setSearchMovie ] = React.useState(''); 

  // собирает значение инпута
  const handleSearchMovie = (evt) => {
    setSearchMovie(evt.target.value);
    setSearchIsActive(true);
    setFilter([]);
    setSearchIsChanging(true);
  }

  // искать фильм 
  const searchMovieSubmit = (evt) => {
    evt.preventDefault();

    setSearchIsChanging(false);

    const filterMovies = movies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(searchMovie.toLowerCase());
    })

    setFilter(filterMovies);
    setSearchIsActive(true);
  }

  return (
    <>
    <main className="main">
      <SearchForm 
        searchSubmit={searchMovieSubmit} 
          searchMovie={searchMovie} 
          searchChange={handleSearchMovie} 
          filterShortMovies={filterShortMovies} 
          movies={movies}
          filter={filter}
          setSearchShortFilmIsActive={setSearchShortFilmIsActive}
          searchIsActive={searchIsActive}
      />
      {isLoading ? <Loader /> : 
      <>
        <MoviesCardList>
          {searchIsActive && (searchShortFilmIsActive ? shortFilm : filter).length === 0 && !searchIsChanging && (
            <h3 className="card__not-found">Ничего не найдено.</h3>
          )}
          {(searchShortFilmIsActive
            ? shortFilm : (searchIsActive ? filter : movies))
            .slice(0, visibleMovies).map((movie) => (
            <MoviesCard 
              key={movie.id}
              filmName={movie.nameRU} 
              filmImage={`https://api.nomoreparties.co/${movie.image.url}`}
              filmDuration={movie.duration}
              nameButton={isSave ? 'save' : 'add-film'}
              textButton={isSave ? '' : 'Сохранить'}
            />
          ))}
        </MoviesCardList>
        <Preloader clickMoreLoad={handleMoreLoad} visibleMovies={visibleMovies} movies={(searchShortFilmIsActive ? shortFilm : (searchIsActive ? filter : movies))} />
      </>}
    </main>
    <Footer />
    </>
  )
}

export default Movies;