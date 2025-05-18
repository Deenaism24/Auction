import React, { useRef } from 'react';
import HeroBanner from '../../components/HeroBanner';
import LotGrid from '../../components/LotGrid';
import './home.css';
import InformationAddition from '../../components/InformationAddition';
import Article from '../../components/Article';
import Footer from '../../widgets/footer';
import Header from '../../widgets/header';

interface HomePageProps {
  showLogin?: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ showLogin }) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Header
        onLoginClick={showLogin}  searchInputRef={searchInputRef} />
      <main>
        <HeroBanner />
        <div className="auctionContainer">
          <LotGrid />
          <InformationAddition ref={searchInputRef} />
        </div>
        <Article />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;