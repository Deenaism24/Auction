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
// Импортируем нужные экшены из filterSortSlice
import { setSearchTerm, setFilters } from '../../store/slices/filterSortSlice';

const HomePage: React.FC = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const location = useLocation();
  // const navigate = useNavigate(); // Не нужен для логики сброса

  // Эффект для фокусировки инпута поиска по хэшу
  useEffect(() => {
    if (location.hash === '#search-section') {
      const searchSectionElement = document.getElementById('search-section');
      // Убеждаемся, что элемент с ID "search-section" существует И что ref привязан к полю ввода
      if (searchSectionElement && searchInputRef.current) {
        // Добавляем небольшую задержку, чтобы гарантировать, что скролл завершился
        // и элемент готов к фокусировке.
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 600); // Время таймаута должно быть достаточным для плавного скролла
      }
    }
    // Эффект запускается при изменении location.hash
  }, [location.hash, searchInputRef]); // Добавляем searchInputRef в зависимости

  // !!! НОВЫЙ ЭФФЕКТ ДЛЯ СБРОСА ФИЛЬТРОВ И ПОИСКА ПРИ ПЕРЕХОДЕ НА СТРАНИЦУ !!!
  useEffect(() => {
    // Этот эффект с пустым массивом зависимостей [] выполняется только один раз:
    // при первом монтировании компонента HomePage.
    // Таким образом, при каждом переходе на главную страницу (будь то первый заход
    // или переход с другой страницы), этот эффект сработает.

    // Диспатчим экшены для сброса состояния фильтров и поиска в Redux
    dispatch(setSearchTerm('')); // Сбрасываем глобальный поисковый запрос
    dispatch(setFilters({ locations: [], events: [], categories: [] })); // Сбрасываем все выбранные фильтры

    console.log("Глобальные фильтры и поиск сброшены при переходе на Домашнюю страницу.");

    // Cleanup функция не нужна для этой логики.
    // cleanup функция нужна, если нужно что-то сделать при УХОДЕ со страницы.
    // Новое требование - приходить на страницу "чистыми".

  }, [dispatch]); // Зависимость от dispatch необходима

  // --- Конец нового эффекта ---


  return (
    <div className="pageLayout">
      {/* Header все еще принимает searchInputRef для фокусировки */}
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