// src/pages/favorite/index.tsx
import React, { useRef, useState } from 'react'; // Импортируем useState для локального поиска

// Импорт компонентов
import FavoritesGrid from '../../components/FavoritesGrid';
import Search from '../../components/Search'; // Используем универсальный Search
import InformationAddition from '../../components/InformationAddition';
import Footer from '../../widgets/footer';
import Header from '../../widgets/header';


const FavoritePage: React.FC = () => {
  // Header все еще требует searchInputRef проп
  const searchInputRefForHeader = useRef<HTMLInputElement>(null);

  // Локальное состояние для значения поиска только на странице избранного
  const [localFavoriteSearchTerm, setLocalFavoriteSearchTerm] = useState('');

  // Не нужен отдельный реф для Search компонента на этой странице

  return (
    <div className="pageLayout">
      {/* Передаем реф в Header */}
      <Header searchInputRef={searchInputRefForHeader} />
      <main className="main">
        <div className="auctionContainer">
          {/* FavoritesGrid принимает локальное значение поиска */}
          <FavoritesGrid favoriteSearchTerm={localFavoriteSearchTerm} />

          <div className="sidebarContainer">
            <Search
              ref={null} // Передаем null, так как этот инпут не связан с Header'ом
              onSearch={setLocalFavoriteSearchTerm} // Обновляем локальное состояние
              // !!! ПЕРЕДАЕМ ТЕКСТ ПЛЕЙСХОЛДЕРА ДЛЯ СТРАНИЦЫ ИЗБРАННОГО !!!
              placeholderText="Быстрый поиск по товарам"
              // ---------------------------------------------------------
            />
            <InformationAddition />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FavoritePage;