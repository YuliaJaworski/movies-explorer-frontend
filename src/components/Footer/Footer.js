import React from "react";
import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <h2 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm</h2>
      <div className='footer__container'>
        <p className="footer__copyright">&#64;2020</p>
        <div className='footer__name-project'>
          <a className='footer__copyright' href='https://practicum.yandex.ru/' target="_blank" rel="noopener noreferrer">Яндекс.Практикум</a>
          <a className='footer__copyright' href='https://github.com/' target="_blank" rel="noopener noreferrer">Github</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;