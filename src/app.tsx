import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import FavoritePage from './pages/favorite';
import InformationPage from './pages/information';
import FooterLinksPage from './pages/footerLinks';
import { AuthModalProvider } from './contexts/AuthFlowModalContext';
import { AddCardModalProvider } from './contexts/AddCardModalContext';
import { DeleteFavoriteModalProvider } from './contexts/DeleteFavoriteModalContext';
import { ZoomPhotoModalProvider } from './contexts/ZoomPhotoModalContext';
import { ConfirmationModalProvider } from './contexts/ConfirmationModalContext';
import ModalManager from './widgets/ModalManager';
import { routes } from './routes';

const App = () => {
  return (
    <BrowserRouter>
      <ConfirmationModalProvider>
        <AuthModalProvider>
          <AddCardModalProvider>
            <DeleteFavoriteModalProvider>
              <ZoomPhotoModalProvider>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/favorite" element={<FavoritePage />} />
                  <Route path={routes.information} element={<InformationPage />} />
                  <Route path={routes.footerLinksPage} element={<FooterLinksPage />} />
                </Routes>
                <ModalManager />
              </ZoomPhotoModalProvider>
            </DeleteFavoriteModalProvider>
          </AddCardModalProvider>
        </AuthModalProvider>
      </ConfirmationModalProvider>
    </BrowserRouter>
  );
};

export default App;
