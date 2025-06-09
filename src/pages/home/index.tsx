import React, { useRef, useEffect } from 'react';
import HeroBanner from '../../components/HeroBanner';
import AuctionLotGrid from '../../components/AuctionLotGrid';
import InformationAddition from '../../components/InformationAddition';
import Article from '../../components/Article';
import Footer from '../../widgets/footer';
import Header from '../../widgets/header';
import Search from '../../components/Search';
import {useDispatch} from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setSearchTerm } from '../../store/slices/filterSortSlice';

const HomePage: React.FC = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const location = useLocation(); // Получаем объект location

  useEffect(() => {
    // Проверяем, что хеш соответствует секции поиска
    if (location.hash === '#search-section') {
      const searchSectionElement = document.getElementById('search-section');
      // Дополнительная проверка: убеждаемся, что элемент поиска существует в DOM
      if (searchSectionElement) {
        // Используем setTimeout, чтобы дать браузеру время на прокрутку и рендер
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 600); // Таймаут должен быть достаточным для завершения прокрутки
      }
    }
    // Эффект запускается при изменении location.hash
  }, [location.hash]); // Зависимость от location.hash

  return (
    <>
      <Header searchInputRef={searchInputRef} />
      <HeroBanner />
      <main className="main">
        <div className="auctionContainer">
          <AuctionLotGrid />
          <div className="sidebarContainer"> {/* Возможно, вам нужен отдельный CSS класс */}
            <Search
              ref={searchInputRef}
              onSearch={(value) => dispatch(setSearchTerm(value))}
            />
            <InformationAddition/>
          </div>
        </div>
        <Article />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
