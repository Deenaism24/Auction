import React, { useState } from 'react';
import * as styles from './style.module.css';
import closeIcon from '../icons/close.svg';

interface CreatePasswordProps {
  onClose: () => void;
  onSuccess: () => void;
}

const CreatePassword: React.FC<CreatePasswordProps> = ({ onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add password creation logic
    onSuccess();
  };

  return (
    <div className={styles.popup}>
      <img src={closeIcon} onClick={onClose} alt='Close' className={styles.closeIcon} />
      <h2 className={styles.title}>СОЗДАТЬ ПАРОЛЬ</h2>
      <p className={styles.description}>
        Войдите в свою учетную запись, чтобы делать ставки и регистрироваться для участия в продажах.
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="password"
          placeholder="Новый пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Подтвердите пароль"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={styles.input}
          required
        />
        <button type="submit" className={`${styles.button} ${styles.primaryButton}`}>
          Создать новый пароль
        </button>
      </form>
    </div>
  );
};

export default CreatePassword;