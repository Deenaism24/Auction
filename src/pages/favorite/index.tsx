// src/pages/favorite/index.tsx
import React, { useRef, useState } from 'react'; // Импортируем useState для локального поиска
// Не нужно импортировать useDispatch или setSearchTerm, так как поиск здесь локальный

// Импорт компонентов
import FavoritesGrid from '../../components/FavoritesGrid';
import Search from '../../components/Search'; // <-- Используем универсальный Search
import InformationAddition from '../../components/InformationAddition';
import Footer from '../../widgets/footer';
import Header from '../../widgets/header';


const FavoritePage: React.FC = () => {
  // Header все еще требует searchInputRef проп, даже если на этой странице нет хэш-ссылки на поиск.
  // Передадим ему реф, но он не будет использоваться Header'ом для фокусировки поиска на этой странице.
  const searchInputRefForHeader = useRef<HTMLInputElement>(null);

  // Локальное состояние для значения поиска только на странице избранного
  const [localFavoriteSearchTerm, setLocalFavoriteSearchTerm] = useState('');

  // Не нужен отдельный реф для Search компонента на этой странице,
  // так как он не будет фокусироваться по хэш-ссылке из хедера.
  // Мы просто передадим `null` в проп `ref` компонента Search.


  return (
    <div className="pageLayout">
      {/* Передаем реф в Header. Header не будет фокусировать поиск на этой странице при клике. */}
      <Header searchInputRef={searchInputRefForHeader} />
      <main className="main">
        <div className="auctionContainer">
          {/* FavoritesGrid принимает локальное значение поиска */}
          <FavoritesGrid favoriteSearchTerm={localFavoriteSearchTerm} />

          <div className="sidebarContainer">
            {/* Используем универсальный компонент Search */}
            {/* НЕ передаем реф для Header'а этому экземпляру Search. Передаем null. */}
            {/* Передаем функцию, которая будет обновлять локальное состояние поиска */}
            <Search
              ref={null} // <-- Передаем null, так как этот инпут не связан с Header'ом
              onSearch={setLocalFavoriteSearchTerm} // <-- Обновляем локальное состояние
            />
            {/* InformationAddition остается без изменений */}
            <InformationAddition />
          </div>
        </div>
      </main>
      {/* Footer остается без изменений */}
      <Footer />
    </div>
  );
};

export default FavoritePage;