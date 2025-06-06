import React, { useState } from 'react';
import * as styles from './style.module.css';
import closeIcon from '../icons/close.svg';

interface ForgottenPasswordProps {
  onClose: () => void;
  onSuccess: () => void;
}

const ForgottenPassword: React.FC<ForgottenPasswordProps> = ({ onClose, onSuccess }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add password recovery logic
    onSuccess();
  };

  return (
    <div className={styles.popup}>
      <img src={closeIcon} onClick={onClose} alt='Close' className={styles.closeIcon} />
      <div className={styles.title}> ЗАБЫЛИ ПАРОЛЬ </div>
      <div className={styles.content}>
        <p className={styles.description}>
          Пожалуйста, укажите Ваш E-mail адрес для восстановления пароля.
        </p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
          <button type="submit" className={`${styles.mainButton} ${styles.active}`}>
            Продолжить
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgottenPassword;