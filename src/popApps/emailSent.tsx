import React from 'react';
import * as styles from './style.module.css';
import closeIcon from '../icons/close.svg';

interface EmailSentPopupProps {
  onClose: () => void;
}

const EmailSentPopup: React.FC<EmailSentPopupProps> = ({ onClose }) => {
  return (
    <div className={ styles.popup }>
      <img src={closeIcon} onClick={onClose} alt='Close' className={styles.closeIcon} />
      <h2 className={ styles.title }>EMAIL SENT</h2>
      <p className={ styles.description }>
        На указанный Вами электронный адрес отправлено письмо с инструкцией по восстановлению пароля.
      </p>
      <button onClick={onClose} className={`${styles.mainButton} ${styles.active}`}>
        OK
      </button>
    </div>
  );
};

export default EmailSentPopup;