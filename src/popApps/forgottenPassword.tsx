import React, { useState } from 'react';
import './style.css';

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
    <div className='popup'>
      <button className='closeButton' onClick={onClose}>×</button>
      <h2 className='title'>ЗАБЫЛИ ПАРОЛЬ</h2>
      <p className='description'>
        Пожалуйста, укажите Ваш E-mail адрес для восстановления пароля.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='input'
          required
        />
        <button type="submit" className='button primaryButton'>
          Продолжить
        </button>
      </form>
    </div>
  );
};

export default ForgottenPassword;