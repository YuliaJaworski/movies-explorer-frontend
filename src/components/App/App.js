import React from 'react';
import './App.css';
import Main from '../Main/Main';
import Header from '../Header/Header';
import { Route, Routes } from 'react-router-dom';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import NavBar from '../NavBar/NavBar';
import moviesApi from '../../utils.js/MoviesApi';

function App() {
  const [ isNavBarOpen, setIsNavBarOpen ] = React.useState(null);
  const [ movies, setMovies ] = React.useState([]);
  const [ isLoading, setIsLoading ] = React.useState(true);

  // открыть навигацию по странице
  const closeNavBar = (isNavBarOpen) => setIsNavBarOpen(null);

  // рендер карточек фильмов
  React.useEffect(() => {
    setIsLoading(false);
    moviesApi
      .getAllMovies()
      .then((movies) => {
        setMovies(movies);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="page">
      <Header  onClick={setIsNavBarOpen}/>
      <Routes>
        <Route path='/' element={<Main />}/>
        <Route path='/movies' element={<Movies movies={movies} isLoading={isLoading} />} />
        <Route path='/saved-movies' element={<SavedMovies />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <NavBar isOpen={isNavBarOpen} onClose={closeNavBar}/>
    </div>
  );
}

export default App;
