import React, { useState } from 'react';
import * as styles from './style.module.css';
import closeIcon from '../icons/close.svg';
import eyeIcon from '../icons/eye.svg';
import closedEyeIcon from '../icons/closedEye.svg';

interface CreatePasswordProps {
  onClose: () => void;
  onSuccess: () => void;
}

const CreatePassword: React.FC<CreatePasswordProps> = ({ onClose, onSuccess }) => {
  const [password1, setPassword1] = useState('');
  const [showPassword1, setShowPassword1] = useState(false);
  const [password2, setPassword2] = useState('');
  const [showPassword2, setShowPassword2] = useState(false);

  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

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

        <div className={styles.inputContainer}>
          <input
            type={showPassword1 ? "text" : "password"}
            placeholder="Новый пароль"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            className={styles.input}
            required
          />
          <button
            type="button"
            className={styles.passwordToggle}
            onClick={togglePasswordVisibility1}
          >
            <img
              src={showPassword1 ? eyeIcon : closedEyeIcon}
              alt="Toggle password visibility"
              className={styles.eyeIcon}
            />
          </button>
        </div>
        <div className={styles.inputContainer}>
          <input
            type={showPassword2 ? "text" : "password"}
            placeholder="Подтвердите пароль"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            className={styles.input}
            required
          />
          <button
            type="button"
            className={styles.passwordToggle}
            onClick={togglePasswordVisibility2}
          >
            <img
              src={showPassword2 ? eyeIcon : closedEyeIcon}
              alt="Toggle password visibility"
              className={styles.eyeIcon}
            />
          </button>
        </div>
        <button type="submit" className={`${styles.mainButton} ${styles.active}`}>
          Создать новый пароль
        </button>
      </form>
    </div>
  );
};

export default CreatePassword;