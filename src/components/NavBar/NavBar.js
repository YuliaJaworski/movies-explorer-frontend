import React from "react";
import './NavBar.css';
import { NavLink, Link } from "react-router-dom";

function NavBar({ isOpen, onClose }) {
  return (
    <section className={`nav-link ${isOpen ? "nav-link_opened" : ""}`}>
      <div className="nav-link__container">
        <button className="nav-link__close" onClick={onClose} />
        <nav className="nav-link__link-container">
          <NavLink to='/' className={({isActive}) => `nav-link__link ${isActive ? "nav-link__link_active" : ""}`}>Главная</NavLink>
          <NavLink to='/movies' className={({isActive}) => `nav-link__link ${isActive ? "nav-link__link_active" : ""}`}>Фильмы</NavLink>
          <NavLink to='/saved-movies' className={({isActive}) => `nav-link__link ${isActive ? "nav-link__link_active" : ""}`}>Сохранённые фильмы</NavLink>
        </nav>
        <Link to='/profile' className='header__btn_field_account nav-link__account'>Аккаунт</Link>
      </div>
    </section>
  )
}

export default NavBar;