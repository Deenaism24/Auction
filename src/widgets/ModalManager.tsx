// src/widgets/ModalManager.tsx
import React from 'react';
import { useAuthModal } from '../contexts/AuthFlowModalContext';
import { useZoomPhotoModal } from '../contexts/ZoomPhotoModalContext';
import { useConfirmationModal } from '../contexts/ConfirmationModalContext';

import LoginPopup from '../popApps/login';
import RegisterPopup from '../popApps/accountRegistration';
import ForgotPasswordPopup from '../popApps/forgottenPassword';
import CreatePasswordPopup from '../popApps/createPassword';
import EmailSentPopup from '../popApps/emailSent';
import PhotoPopup from '../popApps/photo';
import ConfirmationPopup from '../popApps/confirmation';


const ModalManager = () => {
  const { isOpen: authOpen, view, close: closeAuth, data } = useAuthModal();
  const { isOpen: zoomOpen, imageUrl, close: closeZoom } = useZoomPhotoModal();
  const { isOpen: confirmationOpen, close: closeConfirmation } = useConfirmationModal();

  // Если открыт popup приближения изображения — показываем только его
  if (zoomOpen && imageUrl) {
    return <PhotoPopup imageUrl={imageUrl} onClose={closeZoom} />;
  }

  if (confirmationOpen) {
    return <ConfirmationPopup onClose={closeConfirmation} />;
  }

  if (!authOpen || !view) return null;

  switch (view) {
    case 'login':
      return <LoginPopup onClose={closeAuth} />;
    case 'register':
      return (
        <RegisterPopup
          onClose={closeAuth}
          onSuccess={() => {}}
          prefillData={data}
        />
      );
    case 'forgot-password':
      return <ForgotPasswordPopup onClose={closeAuth} onSuccess={() => {}} />; // Укажите реальный обработчик успеха
    case 'create-password':
      return <CreatePasswordPopup onClose={closeAuth} onSuccess={() => {}} />; // Укажите реальный обработчик успеха
    case 'email-sent':
      return <EmailSentPopup onClose={closeAuth} />;
    default:
      return null;
  }
};

export default ModalManager;