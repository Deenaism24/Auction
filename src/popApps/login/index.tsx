import React, { useState } from 'react';
import './LoginPopup.css';

interface LoginPopupProps {
  onClose: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Добавить авторизацию
    console.log('Логин:', email, password);
  };

  return (
    <div className='popup'><
      button className='closeButton' onClick={onClose}>
        ×
      </button>
      <h2 className='title'>Авторизация</h2>
      <p className='description'>
        Войдите в свою учетную запись, чтобы делать ставки и регистрироваться для участия в
        продажах.
      </p>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Электронная почта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='input'
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='input'
          required
        />
        <div className='forgotPassword'>
          <button type="button" className='linkButton'>
            Забыли пароль?
          </button>
        </div>
        <button type="submit" className='loginButton'>
          Войти
        </button>
        <button type="button" className='createAccountButton'>
          Создать аккаунт
        </button>
      </form>
    </div>
  );
};

export default LoginPopup;
