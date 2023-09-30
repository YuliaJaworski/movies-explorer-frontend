import React from 'react';
import './App.css';
import Main from '../Main/Main';
import Header from '../Header/Header';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import NavBar from '../NavBar/NavBar';
import moviesApi from '../../utils.js/MoviesApi';
import mainApi from '../../utils.js/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute';
import * as auth from "../../utils.js/auth";

function App() {
  const [ isNavBarOpen, setIsNavBarOpen ] = React.useState(null); // открытие навигации по сайту
  const [ movies, setMovies ] = React.useState([]); // массив фильмов
  const [ savedMovies, setSavedMovies ] = React.useState([]); // массив сохраненных фильмов
  const [ isLoading, setIsLoading ] = React.useState(true); // загрузка материалов страницы
  const [currentUser, setCurrentUser] = React.useState({});
  const [ error, setError ] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);

  // переменные для отображения фильмов
  const [ visibleMovies, setVisibleMovies ] = React.useState(12);
  const [ widthWindow, setWidthWindow ] = React.useState(window.innerWidth); // ширина окна

  const navigate = useNavigate();

  // открыть навигацию по странице
  const closeNavBar = (isNavBarOpen) => setIsNavBarOpen(null);

  const jwt = localStorage.getItem("jwt");

    // загрузить данные пользователя
    React.useEffect(() => {
      if (loggedIn) {
        mainApi.getUser(jwt)
          .then((user) => {
            setCurrentUser(user);
            setLoggedIn(true);
          })
          .catch(err => console.log(err));
      }
    }, [loggedIn]);

  // рендер карточек фильмов
  React.useEffect(() => {
    if (loggedIn) {
      setIsLoading(false);
      moviesApi
        .getAllMovies()
        .then((movies) => {
          setMovies(movies);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  // загрузить сохраненный карточки
  React.useEffect(() => {
    if (loggedIn) {
      setIsLoading(false);
      mainApi.getSavedMovies(jwt)
        .then((movies) => {
          setSavedMovies(movies.reverse());
        })
      .catch(err => console.log(err));
    }
  }, [loggedIn]);

  // логин
  const handleLogin = (email, password) => {
    auth.login(email, password)
      .then((data) => {
        console.log(data);
        if (data.token) {
          setCurrentUser(data.data);
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          navigate('/movies');
        }
      })
      .catch(err => setError(`Переданы некорректные данные ${err}`));
  }

  // удалить фильм
  const handleDeleteMovie = (deletedMovie) => {
    mainApi
      .deleteMovies(deletedMovie._id, jwt)
      .then(() => {
        setSavedMovies((movies) => movies.filter((c) => c._id !== deletedMovie._id));
      })
      .catch(err => {
        console.log(err);
      });
  }

  // добавить или удалить фильм с роута Movies
  const handleCardLike = (card) => {
    const movie = savedMovies.find((element) => element.movieId === card.id);
    const isLiked = savedMovies.some((element) => element.movieId === card.id);

    if (isLiked) {
      handleDeleteMovie(movie);
    } else {
      mainApi
      .addMovies(
        card.country,
        card.director,
        card.duration,
        card.year,
        card.description,
        `https://api.nomoreparties.co/${card.image.url}`,
        card.trailerLink,
        card.nameRU,
        card.nameEN,
        card.id,
        `https://api.nomoreparties.co/${card.image.url}`,
        jwt
      )
      .then((newSavedMovie) => {
          setSavedMovies([newSavedMovie, ...savedMovies]);
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  const [ dataConfirm, setDataConfirm ] = React.useState(false);
  const [ isEdit, setIsEdit ] = React.useState(false);

  const handleUpdateUser = (name, email) => {
    mainApi.updateUser(name, email, jwt)
      .then((user) => {
        setCurrentUser(user);
        setDataConfirm(true);
        setError('');
        setIsEdit(false);
      })
      .catch(err => {
        setDataConfirm(false);
        setIsEdit(true);
        if (err === 'Ошибка: 409') {
          setError('Пользователь с таким email уже существует.');
        } else {
          setError('При обновлении пользователя произошла ошибка');
        }
      });
  } 

  // прогружает фильмы в ограниченном колличестве
  const handleMoreLoad = () => {
    if (widthWindow <= 768) {
      setVisibleMovies(visibleMovies + 2);
    } else {
      setVisibleMovies(visibleMovies + 3);
    }
  };

  const [ shortFilm, setShortFilm ] = React.useState([]);
  const [ searchShortFilmIsActive, setSearchShortFilmIsActive ] = React.useState(false);

  // искать короткометражки
  const filterShortMovies = (movies) => {
    const shortMovies = movies.filter(function(item) {
      return item.duration <= 40;
    });
    setShortFilm(shortMovies);
    setSearchShortFilmIsActive(true);
  }

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
  }, [widthWindow]);

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [jwt]);

  function signOut() {
    localStorage.removeItem("jwt");
    navigate("/");
    localStorage.removeItem('filterMovies');
    localStorage.removeItem('inputValue');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header  onClick={setIsNavBarOpen} loggedIn={loggedIn}/>
        <Routes>
          <Route path='/' element={<Main />}/>
          <Route path='/movies' element={<ProtectedRoute
            element={Movies} 
            loggedIn={loggedIn}
            movies={movies} 
            isLoading={isLoading} 
            handleMoreLoad={handleMoreLoad}
            visibleMovies={visibleMovies}
            shortFilm={shortFilm}
            searchShortFilmIsActive={searchShortFilmIsActive}
            filterShortMovies={filterShortMovies} 
            setSearchShortFilmIsActive={setSearchShortFilmIsActive}
            changeMovieStatus={handleCardLike}
            savedMovies={savedMovies}
            />} 
          />
        <Route path='/saved-movies' element={<ProtectedRoute 
          loggedIn={loggedIn}
          element={SavedMovies}
          savedMovies={savedMovies}
          isLoading={isLoading}
          handleMoreLoad={handleMoreLoad}
          visibleMovies={visibleMovies}
          shortFilm={shortFilm} 
          filterShortMovies={filterShortMovies} 
          setSearchShortFilmIsActive={setSearchShortFilmIsActive} 
          searchShortFilmIsActive={searchShortFilmIsActive}
          handleDeleteMovie={handleDeleteMovie}
          />} 
        />
        <Route path='/profile' element={<ProtectedRoute 
          loggedIn={loggedIn}
          element={Profile}
          handleUpdateUser={handleUpdateUser} 
          signOut={signOut} 
          serverError={error}
          dataConfirm={dataConfirm}
          setDataConfirm={setDataConfirm}
          isEdit={isEdit} setIsEdit={setIsEdit} />} />
        <Route path='/signin' element={<Login handleLogin={handleLogin} serverError={error} />} />
        <Route path='/signup' element={<Register handleLogin={handleLogin} />} />
        <Route path='*' element={<PageNotFound />} />
        </Routes>
        <NavBar isOpen={isNavBarOpen} onClose={closeNavBar}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
