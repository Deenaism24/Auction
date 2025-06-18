// src/pages/home/index.tsx
import React, { useRef, useEffect } from 'react'; // Импорт хуков React (useRef, useEffect)
import HeroBanner from '../../components/HeroBanner';
import AuctionLotGrid from '../../components/AuctionLotGrid';
import InformationAddition from '../../components/InformationAddition';
import HomeArticle from '../../components/HomeArticle';
import Footer from '../../widgets/footer';
import Header from '../../widgets/header';
import Search from '../../components/Search';
// Импорты для Redux
import { useDispatch } from 'react-redux'; // Хук для диспатча экшенов
import { useLocation } from 'react-router-dom'; // Хук для информации о текущем URL
// Импорт экшенов для сброса фильтров и поиска
import { setSearchTerm, setFilters } from '../../store/slices/filterSortSlice';

// Компонент главной страницы
const HomePage: React.FC = () => {
  // Реф для поля поиска. Используется для фокусировки поля при клике из хедера.
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch(); // Хук для диспатча экшенов Redux
  const location = useLocation(); // Хук для доступа к информации о текущем URL (нужен для хэш-ссылки)

  // Эффект, который срабатывает при изменении хэша в URL (для клика по иконке поиска в хедере)
  useEffect(() => {
    // Проверяем, если хэш URL указывает на секцию поиска
    if (location.hash === '#search-section') {
      // Находим элемент с ID "search-section" (это компонент Search)
      const searchSectionElement = document.getElementById('search-section');
      // Убеждаемся, что элемент найден И что реф привязан к input (внутри Search компонента)
      if (searchSectionElement && searchInputRef.current) {
        // Прокручиваем к секции плавно
        searchSectionElement.scrollIntoView({ behavior: 'smooth' });
        // С небольшой задержкой фокусируем поле ввода, чтобы гарантировать, что скролл завершился
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 300);
      }
    }
    // Эффект зависит от location.hash (чтобы срабатывать при клике из хедера) и searchInputRef (чтобы гарантировать, что реф готов)
  }, [location.hash, searchInputRef]);

  // Эффект, который срабатывает при монтировании компонента HomePage
  // Используется для сброса всех глобальных фильтров и поискового запроса при переходе на главную страницу
  useEffect(() => {
    // Этот эффект с пустым массивом зависимостей [] выполняется только один раз:
    // для сброса глобального поискового запроса в Redux
    dispatch(setSearchTerm(''));
    dispatch(setFilters({ locations: [], events: [], categories: [] }));
    console.log("Global filters and search reset on Homepage.");
  }, [dispatch]);

  // Эта функция вызывается при каждом изменении значения в поле ввода поиска.
  const handleSearchInputChange = (value: string) => {
    // 1. Диспатчим экшен в Redux для обновления глобального поискового запроса
    dispatch(setSearchTerm(value));

    // 2. Если поле ввода стало непустым, скроллим к нему.
    // Проверка value.length > 0 гарантирует, что скролл произойдет при вводе первого символа,
    // а не при каждом последующем изменении, если это нежелательно.
    if (value.length > 0) {
      const searchSectionElement = document.getElementById('search-section');
      if (searchSectionElement) {
        searchSectionElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // При очистке поля (value.length === 0) скролл не происходит.
  };

  // Рендеринг страницы
  return (
    <div className="pageLayout"> {/* Основной контейнер макета страницы */}
      {/* Отображаем хедер, передавая реф для поиска */}
      <Header searchInputRef={searchInputRef} />
      {/* Отображаем главный баннер */}
      <HeroBanner />
      <main className="main"> {/* Основная область контента */}
        {/* Контейнер для расположения сетки лотов и боковой панели (сайдбара) */}
        <div className="auctionContainer">
          {/* Отображаем сетку лотов аукциона */}
          {/* LotGrid будет использовать глобальные фильтры и поиск из Redux */}
          <AuctionLotGrid />
          {/* Контейнер для боковой панели */}
          <div className="sidebarContainer">
            {/* Отображаем компонент поиска */}
            {/* Передаем реф, чтобы Header мог сфокусировать этот input */}
            {/* Передаем функцию onSearch, которая будет обновлять глобальное состояние поиска в Redux */}
            {/* Передаем текст плейсхолдера, специфичный для главной страницы */}
            <Search
              ref={searchInputRef}
              onSearch={handleSearchInputChange}
              placeholderText="Для поиска по аукциону введите номер лота или название"
            />
            {/* Отображаем компонент боковой панели с информацией и фильтрами */}
            {/* InformationAddition будет читать глобальные фильтры из Redux */}
            <InformationAddition/>
          </div>
        </div>
        {/* Отображаем компонент превью статьи */}
        <HomeArticle />
      </main>
      {/* Отображаем футер */}
      <Footer />
    </div>
  );
};

export default HomePage;