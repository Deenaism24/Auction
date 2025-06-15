// src/pages/home/index.tsx
import React, { useRef, useEffect } from 'react';
import HeroBanner from '../../components/HeroBanner';
import AuctionLotGrid from '../../components/AuctionLotGrid';
import InformationAddition from '../../components/InformationAddition';
import HomeArticle from '../../components/HomeArticle';
import Footer from '../../widgets/footer';
import Header from '../../widgets/header';
import Search from '../../components/Search'; // <-- Используем универсальный Search
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setSearchTerm } from '../../store/slices/filterSortSlice';

const HomePage: React.FC = () => {
  // Реф для инпута поиска, который используется Header'ом для фокусировки
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    // Логика фокусировки инпута поиска при переходе по хешу #search-section
    if (location.hash === '#search-section') {
      // Убеждаемся, что элемент с ID "search-section" существует и что ref привязан
      // Search компонент на HomePage имеет ID="search-section" и принимает ref={searchInputRef}
      const searchSectionElement = document.getElementById('search-section');
      if (searchSectionElement && searchInputRef.current) {
        // Добавляем таймаут для корректной работы после плавного скролла
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 600); // Таймаут должен быть достаточным
      }
      // Опционально: удалить хеш из URL после фокусировки, чтобы не скроллить при каждом обновлении
      // navigate(location.pathname, { replace: true }); // Может вызвать проблемы с историей, использовать осторожно
    }
    // Эффект запускается при изменении location.hash
  }, [location.hash, searchInputRef]); // Добавляем searchInputRef в зависимости


  return (
    <div className="pageLayout">
      {/* Передаем реф в Header. Header использует его при клике на иконку поиска */}
      <Header searchInputRef={searchInputRef} />
      <HeroBanner />
      <main className="main">
        <div className="auctionContainer">
          <AuctionLotGrid />
          <div className="sidebarContainer">
            {/* Используем универсальный компонент Search */}
            {/* Передаем реф: это инпут, который Header будет пытаться сфокусировать */}
            {/* Передаем функцию, которая будет обновлять глобальное состояние поиска в Redux */}
            <Search
              ref={searchInputRef}
              onSearch={(value) => dispatch(setSearchTerm(value))}
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