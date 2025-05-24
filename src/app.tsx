import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import FavoritePage from './pages/favorite';
import { AuthModalProvider } from './contexts/AuthFlowModalContext';
import { AddCardModalProvider } from './contexts/AddCardModalContext';
import { DeleteFavoriteModalProvider } from './contexts/DeleteFavoriteModalContext';
import { ZoomPhotoModalProvider } from './contexts/ZoomPhotoModalContext';
import ModalManager from './widgets/ModalManager';

const App = () => {
  return (
    <BrowserRouter>
      <AuthModalProvider>
        <AddCardModalProvider>
          <DeleteFavoriteModalProvider>
            <ZoomPhotoModalProvider>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/favorite" element={<FavoritePage />} />
              </Routes>
              <ModalManager />
            </ZoomPhotoModalProvider>
          </DeleteFavoriteModalProvider>
        </AddCardModalProvider>
      </AuthModalProvider>
    </BrowserRouter>
  );
};

export default App;
