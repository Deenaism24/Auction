import React from 'react';
import { useAuthModal } from '../contexts/AuthFlowModalContext';
import LoginPopup from '../popApps/login';
import RegisterPopup from '../popApps/accountRegistration';
import ForgotPasswordPopup from '../popApps/forgottenPassword';
import CreatePasswordPopup from '../popApps/createPassword';
import PhotoPopup from '../popApps/photo';
import EmailSentPopup from '../popApps/emailSent';

const ModalManager = () => {
  const { isOpen, view, close } = useAuthModal();

  if (!isOpen || !view) return null;

  switch (view) {
    case 'login':
      return <LoginPopup onClose={close} />;
    case 'register':
      return <RegisterPopup onClose={close} onSuccess={() => {}} />;
    case 'forgot-password':
      return <ForgotPasswordPopup onClose={close} onSuccess={() => {}} />;
    case 'create-password':
      return <CreatePasswordPopup onClose={close} onSuccess={() => {}} />;
    case 'email-sent':
      return <EmailSentPopup onClose={close} />;
    default:
      return null;
  }
};

export default ModalManager;
