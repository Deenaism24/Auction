import React from 'react';
import * as styles from './style.module.css';
import closeIcon from '../icons/close.svg';

interface MessageSendProps {
  onClose: () => void;
}

const MessageSend: React.FC<MessageSendProps> = ({ onClose }) => {
  return (
    <div className={ styles.popup }>
      <img src={closeIcon} onClick={onClose} alt='Close' className={styles.closeIcon} />
      <div className={ styles.title }>ПИСЬМО ОТПРАВЛЕНО</div>
      <p className={ styles.description }>
        На указанный Вами электронный адрес отправлено письмо с инструкцией по восстановлению пароля.
      </p>
      <button onClick={onClose} className={`${styles.mainButton} ${styles.active}`}>
        Хорошо
      </button>
    </div>
  );
};

export default MessageSend;