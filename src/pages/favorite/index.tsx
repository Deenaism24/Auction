// src/pages/favorite/index.tsx
import React, { useRef } from 'react';
import FavoritesGrid from '../../components/FavoritesGrid';

// !!! ИМПОРТИРУЕМ FAVORITESEARCH !!!
import FavoriteSearch from '../../components/FavoriteSearch';
import InformationAddition from '../../components/InformationAddition';

// ИМПОРТЫ ДЛЯ REDUX
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../../store/slices/filterSortSlice';

// Другие импорты
import Footer from '../../widgets/footer';
import Header from '../../widgets/header';
import NavigateHeader from '../../components/NavigateHeader';


const FavoritePage: React.FC = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  return (
    <div className="pageLayout">
      <Header searchInputRef={searchInputRef} />
      <main className="main">
        <NavigateHeader/>
        <div className="auctionContainer">
          <FavoritesGrid />

          <div className="sidebarContainer">
            <FavoriteSearch
              onSearch={(value) => dispatch(setSearchTerm(value))}
            />

            {/* InformationAddition на этой странице рендерит только контакты */}
            <InformationAddition />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FavoritePage;