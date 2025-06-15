// src/pages/favorite/index.tsx
import React, { useRef, useState } from 'react'; // Импорт хуков React (useState для локального состояния поиска)

// Импорт компонентов, используемых на странице
import FavoritesGrid from '../../components/FavoritesGrid';
import Search from '../../components/Search';
import InformationAddition from '../../components/InformationAddition';
import Footer from '../../widgets/footer';
import Header from '../../widgets/header';


// Компонент страницы "Избранное"
const FavoritePage: React.FC = () => {
  // Реф для поля поиска в хедере.
  const searchInputRefForHeader = useRef<HTMLInputElement>(null);

  // Локальное состояние для хранения поискового запроса ТОЛЬКО на странице избранного.
  // Это состояние не связано с глобальным состоянием поиска в Redux.
  const [localFavoriteSearchTerm, setLocalFavoriteSearchTerm] = useState('');

  // Рендеринг страницы
  return (
    <div className="pageLayout"> {/* Основной контейнер макета страницы */}
      {/* Отображаем хедер, передавая реф (который здесь не используется для фокусировки) */}
      <Header searchInputRef={searchInputRefForHeader} />
      <main className="main"> {/* Основная область контента */}
        {/* Контейнер для расположения сетки лотов и боковой панели */}
        <div className="auctionContainer">
          {/* Отображаем сетку избранных лотов */}
          {/* Передаем ей флаг isFavoritePage=true и локальное состояние поискового запроса */}
          <FavoritesGrid favoriteSearchTerm={localFavoriteSearchTerm} />

          {/* Контейнер для боковой панели */}
          <div className="sidebarContainer">
            {/* Отображаем компонент поиска */}
            {/* Передаем null в ref, так как этот инпут не должен фокусироваться из хедера */}
            {/* Передаем функцию onSearch, которая обновляет ЛОКАЛЬНОЕ состояние поискового запроса */}
            <Search
              ref={null}
              onSearch={setLocalFavoriteSearchTerm}
              // Передаем специфический текст плейсхолдера для поиска на странице избранного
              placeholderText="Быстрый поиск по товарам"
            />
            {/* Отображаем компонент информации и дополнений */}
            {/* InformationAddition сам определяет, показывать контакты или фильтры/инфо, основываясь на текущем URL */}
            <InformationAddition />
          </div>
        </div>
      </main>
      {/* Отображаем футер */}
      <Footer />
    </div>
  );
};

export default FavoritePage;