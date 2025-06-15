// src/pages/home/index.tsx
import React, { useRef, useEffect } from 'react';
import HeroBanner from '../../components/HeroBanner';
import AuctionLotGrid from '../../components/AuctionLotGrid';
import InformationAddition from '../../components/InformationAddition';
import HomeArticle from '../../components/HomeArticle';
import Footer from '../../widgets/footer';
import Header from '../../widgets/header';
import Search from '../../components/Search'; // Используем универсальный Search
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setSearchTerm, setFilters } from '../../store/slices/filterSortSlice';
// import { routes } from '../../routes'; // routes не нужен здесь

const HomePage: React.FC = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const location = useLocation();

  // Эффект для фокусировки инпута поиска по хэшу
  useEffect(() => {
    if (location.hash === '#search-section') {
      const searchSectionElement = document.getElementById('search-section');
      if (searchSectionElement && searchInputRef.current) {
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 600);
      }
    }
  }, [location.hash, searchInputRef]);

  // Эффект для сброса фильтров и поиска при переходе на страницу
  useEffect(() => {
    // Этот эффект с пустым массивом зависимостей [] выполняется только один раз:
    // при первом монтировании компонента HomePage.
    dispatch(setSearchTerm('')); // Сбрасываем глобальный поисковый запрос
    dispatch(setFilters({ locations: [], events: [], categories: [] })); // Сбрасываем все выбранные фильтры

    console.log("Глобальные фильтры и поиск сброшены при переходе на Домашнюю страницу.");

  }, [dispatch]); // Зависимость от dispatch необходима


  return (
    <div className="pageLayout">
      <Header searchInputRef={searchInputRef} />
      <HeroBanner />
      <main className="main">
        <div className="auctionContainer">
          <AuctionLotGrid />
          <div className="sidebarContainer">
            <Search
              ref={searchInputRef}
              onSearch={(value) => dispatch(setSearchTerm(value))}
              // !!! ПЕРЕДАЕМ ТЕКСТ ПЛЕЙСХОЛДЕРА ДЛЯ ГЛАВНОЙ СТРАНИЦЫ !!!
              placeholderText="Для поиска по аукциону введите номер лота или название"
              // --------------------------------------------------------
            />
            <InformationAddition/>
          </div>
        </div>
        <HomeArticle />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;