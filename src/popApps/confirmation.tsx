// src/popApps/confirmation.tsx
import React from 'react'; // Импорт React
import * as styles from './style.module.css';
import closeIcon from '../icons/close.svg';

// Импорт хука для работы с контекстом модального окна подтверждения
import { useConfirmationModal } from '../contexts/ConfirmationModalContext';

// Интерфейс пропсов для компонента подтверждения
interface ConfirmationProps {
  onClose: () => void; // Функция для закрытия попапа (передается из ModalManager)
}

// Компонент попапа подтверждения действия
const ConfirmationPopup: React.FC<ConfirmationProps> = () => {
  // Получаем состояние и функции из контекста ConfirmationModalContext
  const { isOpen, message, filename, _confirm, _cancel } = useConfirmationModal();

  // Если попап не открыт или данные отсутствуют, не рендерим ничего
  if (!isOpen || message === null || filename === null) return null;

  // Рендеринг попапа подтверждения
  return (
    <div className={ styles.popup }> {/* Контейнер попапа */}
      {/* Иконка закрытия - при клике вызывается функция отмены (_cancel), которая также закрывает попап */}
      <img src={closeIcon} onClick={_cancel} alt='Close' className={styles.closeIcon} />
      {/* Заголовок попапа */}
      <div className={ styles.title }>ПОДТВЕРДИТЬ</div>
      {/* Основное содержимое попапа */}
      <div className={styles.content}>
        {/* Текст сообщения с названием файла, требующего подтверждения */}
        <p className={ styles.description }>
          {message} <strong>{filename}</strong>? {/* message и filename берутся из контекста */}
        </p>
        {/* Кнопки действий */}
        <div className={styles.buttons}>
          {/* Кнопка "Да" - при клике вызывается функция подтверждения из контекста (_confirm) */}
          <button onClick={_confirm} className={`${styles.mainButton} ${styles.active}`}>
            Да
          </button>
          {/* Кнопка "Нет" - при клике вызывается функция отмены из контекста (_cancel) */}
          <button onClick={_cancel} className={styles.mainButton}>
            Нет
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;