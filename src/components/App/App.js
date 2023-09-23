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

function App() {
  const [ isNavBarOpen, setIsNavBarOpen ] = React.useState(null); // открытие навигации по сайту
  const [ movies, setMovies ] = React.useState([]); // массив фильмов
  const [ saveMovies, setSaveMovies ] = React.useState([]); // массив сохраненных фильмов
  const [ isLoading, setIsLoading ] = React.useState(true); // загрузка материалов страницы
  const [ isSaveMovies, setIsSaveMovies ] = React.useState(false); // статус фильма
  const [ userInfo, setUserInfo ] = React.useState({ name: '', email: ''}); // передать данные пользователя

  // переменные для отображения фильмов
  const [ visibleMovies, setVisibleMovies ] = React.useState(12);
  const [ widthWindow, setWidthWindow ] = React.useState(window.innerWidth); // ширина окна

  const navigate = useNavigate();

  // открыть навигацию по странице
  const closeNavBar = (isNavBarOpen) => setIsNavBarOpen(null);

  // рендер карточек фильмов
  React.useEffect(() => {
    setIsLoading(false);
    moviesApi
      .getAllMovies()
      .then((movies) => {
        setMovies(movies);
        setIsSaveMovies(false);
      })
      .catch((err) => console.log(err));
  }, []);

  // логин
  const handleLogin = (email, password) => {
    mainApi.login(email, password)
      .then((data) => {
        console.log(data);
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          navigate('/movies');
          setUserInfo({name: data.name, email: data.email});
        }
      })
      .catch(err => console.log(err));
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
      mainApi.getUser(jwt)
        .then((user) => {
          setUserInfo({name: user.name, email: user.email});
          navigate('/movies');
        })
        .catch(err => console.log(err));
    }
  } 

  React.useEffect(() => {
    checkToken();
  }, []);

  return (
    <div className="page">
      <Header  onClick={setIsNavBarOpen}/>
      <Routes>
        <Route path='/' element={<Main />}/>
        <Route path='/movies' element={<Movies 
          movies={movies} 
          isLoading={isLoading} 
          isSave={isSaveMovies} 
          handleMoreLoad={handleMoreLoad}
          visibleMovies={visibleMovies}
          shortFilm={shortFilm}
          searchShortFilmIsActive={searchShortFilmIsActive}
          filterShortMovies={filterShortMovies} 
          setSearchShortFilmIsActive={setSearchShortFilmIsActive}/>} 
        />
        <Route path='/saved-movies' element={<SavedMovies />} />
        <Route path='/profile' element={<Profile userInfo={userInfo} />} />
        <Route path='/signin' element={<Login handleLogin={handleLogin} />} />
        <Route path='/signup' element={<Register handleLogin={handleLogin} />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <NavBar isOpen={isNavBarOpen} onClose={closeNavBar}/>
    </div>
  );
}

export default App;
