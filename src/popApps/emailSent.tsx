import React from 'react'; // Импорт React
import * as styles from './style.module.css';
import closeIcon from '../icons/close.svg';

// Интерфейс пропсов для компонента EmailSentPopup
interface EmailSentPopupProps {
  onClose: () => void; // Функция для закрытия попапа
}

// Компонент попапа, который отображается после успешной отправки письма (например, для сброса пароля)
const EmailSentPopup: React.FC<EmailSentPopupProps> = ({ onClose }) => {
  // Рендеринг попапа "EMAIL SENT"
  return (
    <div className={ styles.popup }> {/* Контейнер попапа */}
      {/* Иконка закрытия */}
      <img src={closeIcon} onClick={onClose} alt='Close' className={styles.closeIcon} />
      {/* Заголовок попапа */}
      <h2 className={ styles.title }>EMAIL SENT</h2>
      {/* Описание - сообщение о том, что письмо отправлено */}
      <p className={ styles.description }>
        На указанный Вами электронный адрес отправлено письмо с инструкцией по восстановлению пароля.
      </p>
      {/* Кнопка "OK" или "Хорошо" для закрытия попапа */}
      <button onClick={onClose} className={`${styles.mainButton} ${styles.active}`}>
        OK
      </button>
    </div>
  );
};

export default EmailSentPopup;