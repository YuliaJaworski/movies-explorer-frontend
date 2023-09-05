import React from "react";
import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <h2 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm</h2>
      <div className='footer__container'>
        <p className="footer__copyright">&#64;2020</p>
        <div className='footer__name-project'>
          <p className='footer__copyright'>Яндекс.Практикум</p>
          <p className='footer__copyright'>Github</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;