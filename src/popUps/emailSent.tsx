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
        We've sent you an email with further instructions. Please check your inbox.
      </p>
      <button onClick={onClose} className={`${styles.button} ${styles.primaryButton}`}>
        OK
      </button>
    </div>
  );
};

export default EmailSentPopup;