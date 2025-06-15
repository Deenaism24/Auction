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

  // Эффект, который срабатывает при изменении хэша в URL
  // Используется для прокрутки к секции поиска и фокусировки поля ввода при переходе по хэш-ссылке из хедера
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
        }, 600); // Таймаут должен быть достаточным для завершения скролла
      }
    }
    // Эффект зависит от location.hash (чтобы срабатывать при клике из хедера) и searchInputRef (чтобы гарантировать, что реф готов)
  }, [location.hash, searchInputRef]);

  // Эффект, который срабатывает при монтировании компонента HomePage
  // Используется для сброса всех глобальных фильтров и поискового запроса при переходе на главную страницу
  useEffect(() => {
    // Этот эффект с пустым массивом зависимостей [] выполняется только один раз:
    // при первом монтировании компонента HomePage.
    // При каждом переходе на '/' компонент монтируется, и этот код выполняется.

    // Диспатчим экшен для сброса глобального поискового запроса в Redux
    dispatch(setSearchTerm(''));
    // Диспатчим экшен для сброса всех выбранных фильтров (локация, событие, категория) в Redux
    dispatch(setFilters({ locations: [], events: [], categories: [] }));

    console.log("Глобальные фильтры и поиск сброшены при переходе на Домашнюю страницу.");

    // Функция очистки (cleanup) здесь не нужна, так как логика сброса происходит при ВХОДЕ на страницу.

  }, [dispatch]); // Зависимость от dispatch необходима, потому что мы используем dispatch внутри useEffect.


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
              onSearch={(value) => dispatch(setSearchTerm(value))}
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