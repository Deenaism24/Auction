import React from 'react';
import { useAuthModal } from '../contexts/AuthFlowModalContext';
import { useZoomPhotoModal } from '../contexts/ZoomPhotoModalContext';

import LoginPopup from '../popUps/login';
import RegisterPopup from '../popUps/accountRegistration';
import ForgotPasswordPopup from '../popUps/forgottenPassword';
import CreatePasswordPopup from '../popUps/createPassword';
import EmailSentPopup from '../popUps/emailSent';
import PhotoPopup from '../popUps/photo';

const ModalManager = () => {
  const { isOpen: authOpen, view, close: closeAuth } = useAuthModal();
  const { isOpen: zoomOpen, imageUrl, close: closeZoom } = useZoomPhotoModal();

  // Если открыт popup приближения изображения — показываем только его
  if (zoomOpen && imageUrl) {
    return <PhotoPopup imageUrl={imageUrl} onClose={closeZoom} />;
  }

  // Если открыт модал окна авторизации
  if (!authOpen || !view) return null;

  switch (view) {
    case 'login':
      return <LoginPopup onClose={closeAuth} />;
    case 'register':
      return <RegisterPopup onClose={closeAuth} onSuccess={() => {}} />;
    case 'forgot-password':
      return <ForgotPasswordPopup onClose={closeAuth} onSuccess={() => {}} />;
    case 'create-password':
      return <CreatePasswordPopup onClose={closeAuth} onSuccess={() => {}} />;
    case 'email-sent':
      return <EmailSentPopup onClose={closeAuth} />;
    default:
      return null;
  }
};

export default ModalManager;
