// src/pages/favorite/index.tsx
import React, { useRef } from 'react';
import FavoritesGrid from '../../components/FavoritesGrid';
import InformationAddition from '../../components/InformationAddition';
import Footer from '../../widgets/footer';
import Header from '../../widgets/header';
import NavigateHeader from '../../components/NavigateHeader';

const FavoritePage: React.FC = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Header searchInputRef={searchInputRef} />
      <main className="main">
        <NavigateHeader/>
        <div className="auctionContainer">
          <FavoritesGrid />
          <InformationAddition ref={searchInputRef} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default FavoritePage;