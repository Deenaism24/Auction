import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
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
