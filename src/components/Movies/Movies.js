import React from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function Movies({ movies }) {
  function converterTime(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    return `${hours}ч${minutes}м`
  }

  const [ searchMovie, setSearchMovie ] = React.useState('');
  const [ filter, setFilter ] = React.useState([]); // найденные фильмы
  // отслеживать показ фильмов из массива или фильтрованных фильмов
  const [ searchIsActive, setSearchIsActive ] = React.useState(false);
  const [ visibleMovies, setVisibleMovies ] = React.useState(12);
  const [ widthWindow, setWidthWindow ] = React.useState(window.innerWidth); // ширина окна
  // отслеживать состояние страницы по время поиска фильмов
  const [ searchIsChanging, setSearchIsChanging ] = React.useState(false); 

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

  // прогружает фильмы в ограниченном колличестве
  const handleMoreLoad = () => {
    if (widthWindow <= 768) {
      setVisibleMovies(visibleMovies + 2);
    } else {
      setVisibleMovies(visibleMovies + 3);
    }
  };

  // отслеживает изменение ширины экрана
  React.useEffect(() => {
    const resizeWindow = () => {
      setWidthWindow(window.innerWidth);
    }
    window.addEventListener('resize', resizeWindow);

    return () => {
      window.removeEventListener('resize', resizeWindow);
    }
  }, []);

  // добавить контрольные точки
  React.useEffect(() => {
    const calculateVisibleCards = () => {
      if (widthWindow <= 500) {
        setVisibleMovies(5);
      } else if (widthWindow <= 768) {
        setVisibleMovies(8);
      } else {
        setVisibleMovies(12);
      }
    };

    calculateVisibleCards();
  }, [widthWindow, searchMovie]);

  return (
    <>
    <main className="main">
      <SearchForm searchSubmit={searchMovieSubmit} searchMovie={searchMovie} searchChange={handleSearchMovie} />
      <MoviesCardList>
        {searchIsActive && filter.length === 0 && !searchIsChanging && (
          <h3 className="card__not-found">Ничего не найдено.</h3>
        )}
        {(searchIsActive ? filter : movies).slice(0, visibleMovies).map((movie) => (
          <MoviesCard 
            key={movie.id}
            filmName={movie.nameRU} 
            filmImage={`https://api.nomoreparties.co/${movie.image.url}`}
            filmDuration={converterTime(movie.duration)}
          />
        ))}
      </MoviesCardList>
      <Preloader clickMoreLoad={handleMoreLoad} visibleMovies={visibleMovies} movies={searchIsActive ? filter : movies} />
    </main>
    <Footer />
    </>
  )
}

export default Movies;