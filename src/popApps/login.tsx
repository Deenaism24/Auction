// LoginPopup.tsx
import React, { useState, useRef, useEffect } from 'react';
import './style.css';
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
    <div className='popup' ref={popupRef}>
      <div className='header'>
        <h2 className='title'>АВТОРИЗАЦИЯ</h2>
        <button className='closeButton' onClick={onClose}>
          <img src={closeIcon} alt='Close' />
        </button>
      </div>

      <div className='content'>
        <p className='description'>
          Войдите в свою учетную запись, чтобы делать ставки и регистрироваться для участия в продажах.
        </p>

        <form onSubmit={handleLogin}>
          <div className='inputContainer'>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='input'
              required
            />
          </div>

          <div className='inputContainer'>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='input'
              required
            />
            <button
              type="button"
              className='passwordToggle'
              onClick={togglePasswordVisibility}
            >
              <img src={showPassword ? closedEyeIcon : eyeIcon} alt="Toggle password visibility" />
            </button>
          </div>

          <div className='forgotPassword'>
            <button type="button" className='forgotPasswordButton'>
              ЗАБЫЛИ ВАШ ПАРОЛЬ?
            </button>
          </div>

          <div className='buttons'>
            <button
              type="submit"
              className={`loginButton ${activeButton === 'login' ? 'active' : ''}`}
              onClick={handleLoginClick}
            >
              Авторизироваться
            </button>
            <button
              type="button"
              className={`createAccountButton ${activeButton === 'create' ? 'active' : ''}`}
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