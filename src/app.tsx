// app.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import FavoritePage from './pages/favorite';
import InformationPage from './pages/information';
import FooterLinksPage from './pages/footerLinks';
import ArticlePage from './pages/article';
import PersonalAccountPage from './pages/personalAccount';
import OpenLotPage from './pages/openLot';

import { AuthModalProvider } from './contexts/AuthFlowModalContext';
import { ZoomPhotoModalProvider } from './contexts/ZoomPhotoModalContext';
import { ConfirmationModalProvider } from './contexts/ConfirmationModalContext';
import ModalManager from './widgets/ModalManager';
import { routes } from './routes';

const App = () => {
  return (
    <BrowserRouter basename="/Auction/">
      <ConfirmationModalProvider>
        <AuthModalProvider>
          <ZoomPhotoModalProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path={routes.favorite} element={<FavoritePage />} />
              <Route path={routes.information} element={<InformationPage />} />
              <Route path={routes.article} element={<ArticlePage />} />
              <Route path={routes.personalAccount} element={<PersonalAccountPage />} />
              <Route path={routes.openLot} element={<OpenLotPage />} />
              <Route path={routes.footerLinksPage} element={<FooterLinksPage />} />
            </Routes>
            <ModalManager />
          </ZoomPhotoModalProvider>
        </AuthModalProvider>
      </ConfirmationModalProvider>
    </BrowserRouter>
  );
};

export default App;