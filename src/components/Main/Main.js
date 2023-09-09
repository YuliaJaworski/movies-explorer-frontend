import React from "react";
import './Main.css';

import aboutMePhoto from '../../images/about-me__image.png';
import arrowLink from '../../images/arrow-link.svg';
import Footer from "../Footer/Footer";

function Main() {
  return (
    <>
    <main className="main">
      <section className='promo'>
        <h1 className='promo__title'>Учебный проект факультета Веб-разработки.</h1>
        <nav className='promo__nav-container'>
          <a className='promo__navtab navtab' href='#about-project'>О проекте</a>
          <a className='promo__navtab navtab' href='#techs'>Технологии</a>
          <a className='promo__navtab navtab' href='#about-me'>Студент</a>
        </nav>
      </section>
      <section className='about-project' id='about-project'>
        <h2 className='about-project__title title'>О проекте</h2>
        <div className='about-project__main-text'>
          <div className="about-project__text">
            <h3 className='about-project__header'>Дипломный проект включал 5 этапов</h3>
            <p className='about-project__subheading'>Составление плана, работу над бэкендом, 
            вёрстку, добавление функциональности и финальные доработки.</p>
          </div>
          <div className="about-project__text">
            <h3 className='about-project__header'>На выполнение диплома ушло 5 недель</h3>
            <p className='about-project__subheading'>У каждого этапа был мягкий и жёсткий дедлайн, 
            которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>
        </div>
        <ul className='about-project__timing'>
          <li className='about-project__week'>1 неделя</li>
          <li className='about-project__week'>4 недели</li>
          <li className='about-project__name-work'>Back-end</li>
          <li className='about-project__name-work'>Front-end</li>
        </ul>
      </section>
      <section className='techs' id='techs'>
        <h2 className='techs__title title'>Технологии</h2>
        <h3 className='techs__subtitle'>7 технологий</h3>
        <h4 className='techs__description'>На курсе веб-разработки 
          мы освоили технологии, которые применили в дипломном проекте.</h4>
        <ul className='techs__container'>
          <li className='techs__navtab navtab'>HTML</li>
          <li className='techs__navtab navtab'>CSS</li>
          <li className='techs__navtab navtab'>JS</li>
          <li className='techs__navtab navtab'>React</li>
          <li className='techs__navtab navtab'>Git</li>
          <li className='techs__navtab navtab'>Express.js</li>
          <li className='techs__navtab navtab'>mongoDB</li>
        </ul>
      </section>
      <section className='about-me' id='about-me'>
        <h2 className='about-me__title title'>Студент</h2>
        <div className='about-me__container'>
          <div className='about-me__main-text'>
            <h3 className='about-me__subtitle'>Виталий</h3>
            <p className='about-me__description'>Фронтенд-разработчик, 30 лет</p>
            <p className='about-me__info'>Я родился и живу в Саратове, закончил факультет экономики СГУ. 
            У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. 
            С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, 
            начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
            <a className='about-me__link' href='https://github.com/YuliaJaworski' target="_blank" rel="noopener noreferrer">Github</a>
          </div>
          <img className='about-me__photo' src={aboutMePhoto} alt='фото студента'/>
        </div>
      </section>
      <section className='portfolio'>
        <h2 className='portfolio__title'>Портфолио</h2>
        <ul className='portfolio__link-container'>
          <li><a className='portfolio__link' href='https://yuliajaworski.github.io/how-to-learn/' target="_blank" rel="noopener noreferrer">Статичный сайт<img className='portfolio__image-link' src={arrowLink} alt='Иконка ссылки'/></a></li>
          <li><a className='portfolio__link' href='https://yuliajaworski.github.io/russian-travel/' target="_blank" rel="noopener noreferrer">Адаптивный сайт<img className='portfolio__image-link' src={arrowLink} alt='Иконка ссылки'/></a></li>
          <li><a className='portfolio__link' href='https://github.com/YuliaJaworski/react-mesto-api-full-gha' target="_blank" rel="noopener noreferrer">Одностраничное приложение<img className='portfolio__image-link' src={arrowLink} alt='Иконка ссылки'/></a></li>
        </ul>
      </section>
    </main>
    <Footer />
    </>
  );
}

export default Main;