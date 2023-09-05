import React from "react";

import filmDesign from '../../images/film1.png';
import filmKino from '../../images/film2.png';
import filmBanksi from '../../images/film3.png';
import filmBaskia from '../../images/film4.png';
import filmSvoboda from '../../images/film5.png';
import filmBook from '../../images/film6.png';
import filmGermany from '../../images/film7.png';
import filmGimme from '../../images/film8.png';
import filmGenise from '../../images/film9.png';
import filmJump from '../../images/film10.png';
import filmHarvy from '../../images/film11.png';
import filmWave from '../../images/film12.png';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function Movies() {
  return (
    <>
    <main className="main">
      <SearchForm />
      <MoviesCardList>
        <MoviesCard filmName='33 слова о дизайне' filmImage={filmDesign} filmDuration='1ч17м' />
        <MoviesCard filmName='Киноальманах "100 лет дизайна"' filmImage={filmKino} filmDuration='1ч17м' />
        <MoviesCard filmName='В погоне за Бенкси' filmImage={filmBanksi} filmDuration='1ч17м' />
        <MoviesCard filmName='Баския: Взрыв реальности' filmImage={filmBaskia} filmDuration='1ч17м' />
        <MoviesCard filmName='Бег это свобода' filmImage={filmSvoboda} filmDuration='1ч17м' />
        <MoviesCard filmName='Книготорговцы' filmImage={filmBook} filmDuration='1ч17м' />
        <MoviesCard filmName='Когда я думаю о Германии ночью' filmImage={filmGermany} filmDuration='1ч17м' />
        <MoviesCard filmName='Gimme Danger: История Игги и The Stooges' filmImage={filmGimme} filmDuration='1ч17м' />
        <MoviesCard filmName='Дженис: Маленькая девочка грустит' filmImage={filmGenise} filmDuration='1ч17м' />
        <MoviesCard filmName='Соберись перед прыжком' filmImage={filmJump} filmDuration='1ч17м' />
        <MoviesCard filmName='Пи Джей Харви: A dog called money' filmImage={filmHarvy} filmDuration='1ч17м' />
        <MoviesCard filmName='По волнам: Искусство звука в кино' filmImage={filmWave} filmDuration='1ч17м' />
      </MoviesCardList>
      <Preloader />
    </main>
    <Footer />
    </>
  )
}

export default Movies;