import React, { useRef } from 'react';
import Header from '../../widgets/header';

import FooterLinks from '../../components/FooterLinks';

const FooterLinksPage: React.FC = () => {
  const searchInputRef = useRef<HTMLInputElement>(null); // Ref for searchInput (Header requires it)

  return (
    <div className="pageLayout">
      <Header searchInputRef={searchInputRef} />

      <main className="main">
        <FooterLinks />
      </main>
    </div>
  );
};

export default FooterLinksPage;