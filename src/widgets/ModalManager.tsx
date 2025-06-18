// src/widgets/ModalManager.tsx
import React from 'react'; // Импорт библиотеки React
// Импорт хуков для работы с контекстами модальных окон
import { useAuthModal } from '../contexts/AuthFlowModalContext';
import { useZoomPhotoModal } from '../contexts/ZoomPhotoModalContext';
import { useConfirmationModal } from '../contexts/ConfirmationModalContext';

import LoginPopup from '../popApps/login'; // Попап авторизации
import RegisterPopup from '../popApps/accountRegistration'; // Попап регистрации
import ForgotPasswordPopup from '../popApps/forgottenPassword'; // Попап восстановления пароля (забыли)
import CreatePasswordPopup from '../popApps/createPassword'; // Попап создания нового пароля
import EmailSentPopup from '../popApps/emailSent'; // Попап сообщения об отправке Email
import PhotoPopup from '../popApps/photo'; // Попап увеличения фото
import ConfirmationPopup from '../popApps/confirmation'; // Попап подтверждения

// Компонент ModalManager отвечает за управление и отображение модальных окон.
// Он слушает состояние различных контекстов модалок и рендерит нужный попап.
const ModalManager = () => {
  // Получаем состояние и функции из контекста AuthFlowModalContext (для авторизации/регистрации и т.д.)
  const { isOpen: authOpen, view, close: closeAuth, data } = useAuthModal();
  // Получаем состояние и функции из контекста ZoomPhotoModalContext (для увеличения фото)
  const { isOpen: zoomOpen, imageUrl, close: closeZoom } = useZoomPhotoModal();
  // Получаем состояние и функции из контекста ConfirmationModalContext (для подтверждений)
  const { isOpen: confirmationOpen, close: closeConfirmation } = useConfirmationModal();

  // Логика выбора, какой попап отобразить:

  // 1. Если открыт попап увеличения изображения, показываем только его.
  // У него самый высокий приоритет.
  if (zoomOpen && imageUrl) {
    return <PhotoPopup imageUrl={imageUrl} onClose={closeZoom} />;
  }

  // 2. Если открыт попап подтверждения, показываем его.
  if (confirmationOpen) {
    return <ConfirmationPopup onClose={closeConfirmation} />;
  }

  // 3. Если ни попап фото, ни попап подтверждения не открыты, проверяем попапы авторизации.
  if (!authOpen || !view) return null;

  // 4. Если открыт попап авторизации, рендерим нужный компонент попапа в зависимости от текущего 'view'.
  switch (view) {
    case 'login': // Если view === 'login', рендерим попап входа
      return <LoginPopup onClose={closeAuth} />;
    case 'register': // Если view === 'register', рендерим попап регистрации
      return (
        <RegisterPopup
          onClose={closeAuth} // Передаем функцию закрытия
          onSuccess={() => {}}
          prefillData={data} // Передаем данные для предзаполнения формы (если есть)
        />
      );
    case 'forgot-password': // Если view === 'forgot-password', рендерим попап восстановления пароля
      return <ForgotPasswordPopup onClose={closeAuth} onSuccess={() => {}} />;
    case 'create-password': // Если view === 'create-password', рендерим попап создания нового пароля
      return <CreatePasswordPopup onClose={closeAuth} onSuccess={() => {}} />;
    case 'email-sent': // Если view === 'email-sent', рендерим попап сообщения об отправке Email
      return <EmailSentPopup onClose={closeAuth} />;
    default: // Если view имеет неизвестное значение, не рендерим ничего (ошибка или неожиданное состояние)
      return null;
  }
};

export default ModalManager; // Экспортируем компонент