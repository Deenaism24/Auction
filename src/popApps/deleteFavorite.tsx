import React from 'react';
import * as styles from './style.module.css';
import closeIcon from './icons/close.svg';

interface DeleteFavoriteProps {
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteFavorite: React.FC<DeleteFavoriteProps> = ({ onClose, onConfirm }) => {
  return (
    <div className={ styles.popup }>
      <img src={closeIcon} onClick={onClose} alt='Close' className={styles.closeIcon} />
      <h2 className={ styles.title }>УБРАТЬ ИЗ ИЗБРАННОГО</h2>
      <p className={ styles.description }>
        Вы уверены, что хотите убрать выбранную позицию из избранного?
      </p>
      <div className={ styles.confirmationButtons }>
        <button onClick={onClose} className={`${styles.mainButton}`}>
          Нет
        </button>
        <button onClick={onConfirm} className={`${styles.mainButton} ${styles.active}`}>
          Да
        </button>
      </div>
    </div>
  );
};

export default DeleteFavorite;