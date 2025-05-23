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
      <h2 className={styles.title}>ЗАБЫЛИ ПАРОЛЬ</h2>
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
        <button type="submit" className={`${styles.button} ${styles.primaryButton}`}>
          Продолжить
        </button>
      </form>
    </div>
  );
};

export default ForgottenPassword;