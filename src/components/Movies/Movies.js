import React from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Loader from "../Loader/Loader";

function Movies({ movies, isLoading, isSave, handleMoreLoad, visibleMovies, addMovies, handleDeleteMovie }) {
  const [ filter, setFilter ] = React.useState([]); // найденные фильмы
  // отслеживать показ фильмов из массива или фильтрованных фильмов
  const [ searchIsActive, setSearchIsActive ] = React.useState(false);
  // отслеживать состояние страницы по время поиска фильмов
  const [ searchIsChanging, setSearchIsChanging ] = React.useState(false);
  const [ searchMovie, setSearchMovie ] = React.useState('');
  const [ isLocalStorageLoaded, setIsLocalStorageLoaded ] = React.useState(false);

  const [ shortFilm, setShortFilm ] = React.useState([]);
  const [ searchShortFilmIsActive, setSearchShortFilmIsActive ] = React.useState(false);
  const [ buttonMoviesIsActive, setButtonMoviesIsActive ] = React.useState(false);

  // искать короткометражки
  const filterShortMovies = (movies) => {
    const shortMovies = movies.filter(function(item) {
      return item.duration <= 40;
    });
    setShortFilm(shortMovies);
    setSearchShortFilmIsActive(true);

    const storageMovies = localStorage.getItem('filterShortMovies');
    if(!storageMovies || (JSON.parse(storageMovies) !== shortMovies)) {
      localStorage.setItem('filterShortMovies', JSON.stringify(shortMovies));
    }
  }

  React.useEffect(() => {
    const filterMovies = localStorage.getItem('filterShortMovies');

    if (filterMovies) {
      setShortFilm(JSON.parse(filterMovies));
      setSearchShortFilmIsActive(true);
    }
    setIsLocalStorageLoaded(true);
  }, []);

  React.useEffect(() => {
    const filterMovies = localStorage.getItem('filterMovies');

    if (filterMovies) {
      setFilter(JSON.parse(filterMovies));
      setSearchIsActive(true);
      setSearchIsChanging(false);
      const input = localStorage.getItem('inputValue');
      setSearchMovie(input);
    }

    setIsLocalStorageLoaded(true);
  }, []);

  // собирает значение инпута
  const handleSearchMovie = (evt) => {
    setSearchMovie(evt.target.value);
    setSearchIsActive(true);
    setFilter([]);
    setSearchIsChanging(true);
    localStorage.setItem('inputValue', evt.target.value);
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
    const storageMovies = localStorage.getItem('filterMovies');
    if(!storageMovies || (JSON.parse(storageMovies) !== filterMovies)) {
      localStorage.setItem('filterMovies', JSON.stringify(filterMovies));
    }
  }

  return (
    <>
    {isLocalStorageLoaded && (
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
          searchShortFilmIsActive={searchShortFilmIsActive}
          isMovies={true} 
          buttonMoviesIsActive={buttonMoviesIsActive}
          setButtonMoviesIsActive={setButtonMoviesIsActive}
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
              movie={movie}
              filmName={movie.nameRU} 
              filmImage={`https://api.nomoreparties.co/${movie.image.url}`}
              filmDuration={movie.duration}
              trailer={movie.trailerLink}
              handleAddMovie={addMovies}
              handleDeleteMovie={handleDeleteMovie}
              isMovies={true}
              isSavedMovies={false}
            />
          ))}
        </MoviesCardList>
        <Preloader clickMoreLoad={handleMoreLoad} visibleMovies={visibleMovies} movies={(searchShortFilmIsActive ? shortFilm : (searchIsActive ? filter : movies))} />
      </>}
    </main>
    )}
    <Footer />
    </>
  )
}

export default Movies;