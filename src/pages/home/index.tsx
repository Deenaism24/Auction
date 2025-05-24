import React, { useRef } from 'react';
import HeroBanner from '../../components/HeroBanner';
import AuctionLotGrid from '../../components/AuctionLotGrid';
import InformationAddition from '../../components/InformationAddition';
import Article from '../../components/Article';
import Footer from '../../widgets/footer';
import Header from '../../widgets/header';

const HomePage: React.FC = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Header searchInputRef={searchInputRef} />
      <HeroBanner />
      <main className="main">
        <div className="auctionContainer">
          <AuctionLotGrid />
          <InformationAddition ref={searchInputRef} />
        </div>
        <Article />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
