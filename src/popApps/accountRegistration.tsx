import React, { useState } from 'react';
import './style.css';

interface RegistrationProps {
  onClose: () => void;
  onSuccess: () => void;
}

const RegisterPopup: React.FC<RegistrationProps> = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreed: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add registration logic
    onSuccess();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className='popup'>
      <button className='closeButton' onClick={onClose}>×</button>
      <h2 className='title'>РЕГИСТРАЦИЯ АККАУНТА</h2>
      <p className='description'>
        Заполните поля для регистрации нового аккаунта в системе.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="ФИО (не обязательно к заполнению)"
          value={formData.name}
          onChange={handleChange}
          className='input'
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail адрес"
          value={formData.email}
          onChange={handleChange}
          className='input'
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Телефон в формате +7 (xxx) xxx – xx – xx"
          value={formData.phone}
          onChange={handleChange}
          className='input'
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
          className='input'
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Подтверждение пароля"
          value={formData.confirmPassword}
          onChange={handleChange}
          className='input'
          required
        />
        <div className='checkboxContainer'>
          <input
            type="checkbox"
            name="agreed"
            id="agreement"
            checked={formData.agreed}
            onChange={handleChange}
            className='checkbox'
            required
          />
          <label htmlFor="agreement" className='checkboxLabel'>
            Я ПРОЧИТАЛ И СОГЛАСЕН С ПРАВИЛАМИ ИСПОЛЬЗОВАНИЯ ПЕРСОНАЛЬНЫХ ДАННЫХ
          </label>
        </div>
        <button type="submit" className='button primaryButton'>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default RegisterPopup;