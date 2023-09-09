import React from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import filmDesign from '../../images/film1.png';
import filmKino from '../../images/film2.png';
import filmBanksi from '../../images/film3.png';
import Footer from "../Footer/Footer";

function SavedMovies() {
  return (
    <>
    <main className="main">
      <SearchForm />
      <MoviesCardList>
        <MoviesCard filmName='33 слова о дизайне' filmImage={filmDesign} filmDuration='1ч17м' nameButton='delete'/>
        <MoviesCard filmName='Киноальманах "100 лет дизайна"' filmImage={filmKino} filmDuration='1ч17м' nameButton='delete' />
        <MoviesCard filmName='В погоне за Бенкси' filmImage={filmBanksi} filmDuration='1ч17м' nameButton='delete' />
      </MoviesCardList>
    </main>
    <Footer />
    </>
  )
}

export default SavedMovies;