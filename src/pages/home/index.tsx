// src/pages/home/index.tsx
import React, { useRef, useEffect, useCallback } from 'react'; // Импорт хуков React
import HeroBanner from '../../components/HeroBanner';
import AuctionLotGrid from '../../components/AuctionLotGrid';
import InformationAddition from '../../components/InformationAddition';
import HomeArticle from '../../components/HomeArticle';
import Footer from '../../widgets/footer';
import Header from '../../widgets/header';
import Search from '../../components/Search';
// Импорты для Redux
import { useDispatch, useSelector } from 'react-redux'; // Хук для диспатча экшенов и хук для чтения состояния
import { useLocation } from 'react-router-dom'; // Хук для информации о текущем URL
// Импорт экшенов для сброса фильтров и поиска
import { setSearchTerm, setFilters } from '../../store/slices/filterSortSlice';
import { RootState } from '../../store'; // Импорт типа корневого состояния Redux

// Функция для прокрутки к секции поиска и фокусировки поля ввода
const scrollToSearchAndFocus = (ref: React.RefObject<HTMLInputElement | null>) => {
  const searchSection = document.getElementById('search-section');
  if (searchSection && ref.current) {
    setTimeout(() => {
      // Прокрутка к элементу
      searchSection.scrollIntoView({ behavior: 'smooth' });
      // Фокусируем поле ввода поиска с помощью переданного рефа
      setTimeout(() => {
        ref.current?.focus();
      }, 300)
    }, 0);
  }
}

// Компонент главной страницы
const HomePage: React.FC = () => {
  // Реф для поля поиска. Используется для фокусировки поля при клике из хедера И при вводе.
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch(); // Хук для диспатча экшенов Redux
  const location = useLocation(); // Хук для доступа к информации о текущем URL (нужен для хэш-ссылки)

  // Читаем текущее состояние поискового запроса из REDUX
  const currentGlobalSearchTerm = useSelector((state: RootState) => state.filterSort.searchTerm);

  // Используем useCallback для мемоизации функции scrollToSearchAndFocus с зависимостью от рефа
  // Это предотвращает создание новой функции при каждом рендере, если searchInputRef не меняется.
  const memoizedScrollToSearchAndFocus = useCallback(
    () => scrollToSearchAndFocus(searchInputRef),
    [searchInputRef] // Зависимость: если searchInputRef меняется, создаем новую мемоизированную функцию
  );

  // Эффект, который срабатывает при изменении хэша в URL
  // Используется для прокрутки к секции поиска и фокусировки поля ввода при переходе по хэш-ссылке из хедера
  useEffect(() => {
    // Проверяем, если хэш URL указывает на секцию поиска
    if (location.hash === '#search-section') {
      // Вызываем мемоизированную функцию прокрутки и фокусировки
      memoizedScrollToSearchAndFocus();
    }
    // Эффект зависит от location.hash (чтобы срабатывать при клике из хедера) и memoizedScrollToSearchAndFocus
    // Зависимость memoizedScrollToSearchAndFocus нужна, потому что она зависит от searchInputRef
  }, [location.hash, memoizedScrollToSearchAndFocus]);


  // Эффект, который срабатывает при монтировании компонента HomePage
  // Используется для сброса всех глобальных фильтров и поискового запроса при переходе на главную страницу
  useEffect(() => {
    // Этот эффект с пустым массивом зависимостей [] выполняется только один раз:
    // при первом монтировании компонента HomePage.
    // При каждом переходе на '/' компонент монтируется, и этот код выполняется.

    dispatch(setSearchTerm(''));
    // Сброс всех выбранных фильтров (локация, событие, категория) в Redux
    dispatch(setFilters({ locations: [], events: [], categories: [] }));

    console.log("Глобальные фильтры и поиск сброшены при переходе на Домашнюю страницу.");
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
            {/* Передаем реф, чтобы Header мог сфокусировать этот input, И для прокрутки при вводе */}
            {/* Передаем функцию onSearch, которая будет обновлять глобальное состояние поиска в Redux */}
            {/* Передаем текст плейсхолдера, специфичный для главной страницы */}
            <Search
              ref={searchInputRef}
              onSearch={(value) => {
                // Проверяем, если поисковая строка была пустой И новый ввод не пустой
                if (!currentGlobalSearchTerm && value) {
                  // Вызываем функцию прокрутки и фокусировки
                  memoizedScrollToSearchAndFocus();
                }
                // Диспатчим экшен для обновления глобального состояния поиска в Redux в любом случае
                dispatch(setSearchTerm(value));
              }}
              placeholderText="Для поиска по аукциону введите номер лота или название"
            />
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