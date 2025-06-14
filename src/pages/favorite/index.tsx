// src/pages/favorite/index.tsx
import React, { useRef } from 'react';
import FavoritesGrid from '../../components/FavoritesGrid';

import FavoriteSearch from '../../components/FavoriteSearch';
import InformationAddition from '../../components/InformationAddition';

// ИМПОРТЫ ДЛЯ REDUX
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../../store/slices/filterSortSlice';

// Другие импорты
import Footer from '../../widgets/footer';
import Header from '../../widgets/header';


const FavoritePage: React.FC = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  return (
    <div className="pageLayout">
      <Header searchInputRef={searchInputRef} />
      <main className="main">
        <div className="auctionContainer">
          <FavoritesGrid />

          <div className="sidebarContainer">
            <FavoriteSearch
              onSearch={(value) => dispatch(setSearchTerm(value))}
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