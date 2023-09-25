import React from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import Footer from "../Footer/Footer";
import Loader from "../Loader/Loader";
import Preloader from "../Preloader/Preloader";

function SavedMovies({ 
  savedMovies, 
  isLoading, 
  handleMoreLoad, 
  visibleMovies, 
  shortFilm, 
  filterShortMovies, 
  setSearchShortFilmIsActive, 
  searchShortFilmIsActive, 
  handleDeleteMovie,
  }) {

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
  
      const filterMovies = savedMovies.filter((movie) => {
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
        movies={savedMovies}
        filter={filter}
        setSearchShortFilmIsActive={setSearchShortFilmIsActive}
        searchIsActive={searchIsActive}/>
      {isLoading ? <Loader /> : 
      <>
        <MoviesCardList>
          {searchIsActive && (searchShortFilmIsActive ? shortFilm : filter).length === 0 && !searchIsChanging && (
            <h3 className="card__not-found">Ничего не найдено.</h3>
          )}
          {(searchShortFilmIsActive
            ? shortFilm : (searchIsActive ? filter : savedMovies))
            .slice(0, visibleMovies).map((movie) => (
            <MoviesCard 
              key={movie._id}
              movie={movie}
              filmName={movie.nameRU} 
              filmImage={movie.image} 
              filmDuration={movie.duration}
              trailer={movie.trailerLink} 
              isSavedMovies={true}
              isMovies={false}
              changeCardStatus={handleDeleteMovie}
            />
          ))}
        </MoviesCardList>
        <Preloader clickMoreLoad={handleMoreLoad} visibleMovies={visibleMovies} movies={(searchShortFilmIsActive ? shortFilm : (searchIsActive ? filter : savedMovies))}/>
      </>
    }
    </main>
    <Footer />
    </>
  )
}

export default SavedMovies;