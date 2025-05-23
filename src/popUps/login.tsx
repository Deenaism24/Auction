import React, { useState, useRef, useEffect } from 'react';
import * as styles from './style.module.css';
import closeIcon from '../icons/close.svg';
import eyeIcon from '../icons/eye.svg';
import closedEyeIcon from '../icons/closedEye.svg';

interface LoginPopupProps {
  onClose: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeButton, setActiveButton] = useState<'login' | 'create'>('login');
  const popupRef = useRef<HTMLDivElement>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add authentication logic
    console.log('Login:', email, password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCreateAccountClick = () => {
    setActiveButton('create');
    // TODO: Handle create account logic
  };

  const handleLoginClick = () => {
    setActiveButton('login');
    // TODO: Handle login logic
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div className={styles.popup} ref={popupRef}>
      <img src={closeIcon} onClick={onClose} alt='Close' className={styles.closeIcon} />
      <div className={styles.title}> АВТОРИЗАЦИЯ</div>

      <div className={styles.content}>
        <p className={styles.description}>
          Войдите в свою учетную запись, чтобы делать ставки и регистрироваться для участия в продажах.
        </p>

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputContainer}>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputContainer}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={togglePasswordVisibility}
            >
              <img
                src={showPassword ? eyeIcon : closedEyeIcon}
                alt="Toggle password visibility"
                className={styles.eyeIcon}
              />
            </button>
          </div>

          <button
            type="button"
            className={styles.forgotPasswordButton}
          >
            ЗАБЫЛИ ВАШ ПАРОЛЬ?
          </button>

          <div className={styles.buttons}>
            <button
              type="submit"
              className={`${styles.loginButton} ${activeButton === 'login' ? styles.active : ''}`}
              onClick={handleLoginClick}
            >
              Авторизироваться
            </button>
            <button
              type="button"
              className={`${styles.loginButton} ${activeButton === 'create' ? styles.active : ''}`}
              onClick={handleCreateAccountClick}
            >
              Создать новый аккаунт
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;