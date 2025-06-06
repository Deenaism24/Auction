import React, { useRef } from 'react';
import Header from '../../widgets/header';
import Footer from '../../widgets/footer';

import FooterLinks from '../../components/FooterLinks';

const FooterLinksPage: React.FC = () => {
  const searchInputRef = useRef<HTMLInputElement>(null); // Ref for searchInput (Header requires it)

  return (
    <>
      <Header searchInputRef={searchInputRef} />

      <main className="main">
        <FooterLinks />
      </main>
    </>
  );
};

export default FooterLinksPage;