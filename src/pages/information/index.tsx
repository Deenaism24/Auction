// src/pages/information/index.tsx
import React, { useRef } from 'react';
import Header from '../../widgets/header';
import Footer from '../../widgets/footer';
import Information from "../../components/Information"

const InformationPage: React.FC = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="pageLayout">
      {/* Main content area for the Information page */}
      <main className="mainContent">
        <Header searchInputRef={searchInputRef} />
        <Information />
      </main>

      <Footer />
    </div>
  );
};

export default InformationPage;