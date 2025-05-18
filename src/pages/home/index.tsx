import React from 'react';
import HeroBanner from '../../components/HeroBanner';
import LotGrid from '../../components/LotGrid';
import './home.css';
import InformationAddition from '../../components/InformationAddition';
import Article from '../../components/Article';
import Footer from '../../widgets/footer';
import Header from '../../widgets/header';

// Основной компонент приложения
const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <HeroBanner />
        <div className="auctionContainer">
          <LotGrid />
          <InformationAddition />
        </div>
        <Article />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
