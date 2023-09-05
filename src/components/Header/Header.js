import React from "react";
import './Header.css';
import { useLocation, Link } from 'react-router-dom';
import headerLogo from '../../images/logo.svg';

function Header({ onClick }) {
    const location = useLocation();
    const page = location.pathname;
  
    const isMovies = page === '/movies';
    const isSavedMovies = page === '/saved-movies';
    const isLogin = page === '/signin';
  
    return (
      <header className='header'>
        {page === '/' && (
          <div className="header__container">
            <Link to ='/' className='header__logo' />
            <div className='header__btn-container'>
              <Link to='/signup' className='header__btn header__btn_field_register'>Регистрация</Link>
              <Link to='/signin' className='header__btn header__btn_field_login'>Войти</Link>
            </div>
          </div>
        )}
        {(page === '/movies' || page === '/saved-movies' || page === '/profile') && (
          <div className="header__container">
            <Link to ='/' className='header__logo' />
            <div className='header__btn-container header__btn-container-movies'>
              <Link to='/movies' className={`header__btn header__btn_field_films ${isMovies ? "header__btn_field_active" : ""}`}>Фильмы</Link>
              <Link to='/saved-movies' className={`header__btn header__btn_field_films ${isSavedMovies ? "header__btn_field_active" : ""}`}>Сохраненные фильмы</Link>
            </div>
            <div className='header__btn-container header__btn-container-movies'>
              <Link to='/profile' className='header__btn header__btn_field_account'>Аккаунт</Link>
            </div>
            <button className="header__nav-button" onClick={onClick} />
          </div>
        )}
        {(page === '/signin' || page === '/signup') && (
          <div className="header__container-auth">
            <img className='header__logo' src={headerLogo} alt='лого' />
            <h2 className="header__title">{isLogin ? 'Рады видеть!' : 'Добро пожаловать!'}</h2>
          </div>
        )}
      </header>
    );
  }

export default Header;