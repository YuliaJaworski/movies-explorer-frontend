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
      mainApi.getSavedMovies()
        .then((movies) => {
          setSavedMovies(movies.reverse());
          movies.map((item) => localStorage.setItem(item.movieId, 'true'));
        })
      .catch(err => console.log(err));
    }
  }, [loggedIn]);

  // загрузить данные пользователя
  React.useEffect(() => {
    if (loggedIn) {
      mainApi.getUser()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch(err => console.log(err));
    }
  }, [loggedIn, currentUser]);

  // логин
  const handleLogin = (email, password) => {
    mainApi.login(email, password)
      .then((data) => {
        console.log(data);
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          navigate('/movies');
          setCurrentUser(data);
          setLoggedIn(true);
        }
      })
      .catch(err => setError(`Переданы некорректные данные ${err}`));
  }

  // добавить фильм в сохраненные
  const handleAddMoviesSubmit = (movie) => {
    mainApi
      .addMovies(
        movie.country,
        movie.director,
        movie.duration,
        movie.year,
        movie.description,
        `https://api.nomoreparties.co/${movie.image.url}`,
        movie.trailerLink,
        movie.nameRU,
        movie.nameEN,
        movie.id,
        `https://api.nomoreparties.co/${movie.image.url}`
      )
      .then((newSavedMovie) => {
        if (movie.id === newSavedMovie.movieId) {
          setSavedMovies([newSavedMovie, ...savedMovies]);
          localStorage.setItem(movie.id, 'true');
        }
      })
      .catch(err => console.log(err));
  }

  // удалить фильм
  const handleDeleteMovie = (deletedMovie) => {
    mainApi
      .deleteMovies(deletedMovie._id)
      .then(() => {
        setSavedMovies((movies) => movies.filter((c) => c._id !== deletedMovie._id));
        localStorage.removeItem(deletedMovie.movieId);
      })
      .catch(err => console.log(err));
  }

  const handleUpdateUser = (name, email) => {
    mainApi.updateUser(name, email)
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(err => {
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

  // проверка наличия токена
  const checkToken = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setLoggedIn(true);
    }
  } 

  React.useEffect(() => {
    checkToken();
  }, []);

  function signOut() {
    localStorage.removeItem("jwt");
    movies.map(item => localStorage.removeItem(item.id));
    navigate("/signin");
    localStorage.removeItem('search');
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
            addMovies={handleAddMoviesSubmit}
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
          serverError={error}/>} />
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
