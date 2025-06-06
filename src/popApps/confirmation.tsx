// src/popApps/confirmation.tsx
import React from 'react';
import * as styles from './style.module.css';
import closeIcon from '../icons/close.svg';

import { useConfirmationModal } from '../contexts/ConfirmationModalContext';

interface ConfirmationProps {
  onClose: () => void;
}

const ConfirmationPopup: React.FC<ConfirmationProps> = ({ onClose }) => {
  const { isOpen, message, filename, _confirm, _cancel } = useConfirmationModal();

  if (!isOpen || message === null || filename === null) return null;

  return (
    <div className={ styles.popup }>
      <img src={closeIcon} onClick={onClose} alt='Close' className={styles.closeIcon} />
      <div className={ styles.title }>ПОДТВЕРДИТЬ</div>
      <div className={styles.content}>
        <p className={ styles.description }>
          {message} <strong>{filename}</strong>?
        </p>
        <div className={styles.buttons}>
          <button onClick={_confirm} className={`${styles.mainButton} ${styles.active}`}>
            Да
          </button>
          <button onClick={_cancel} className={styles.mainButton}>
            Нет
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;