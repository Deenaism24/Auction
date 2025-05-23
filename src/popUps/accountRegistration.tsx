import React, { useState } from 'react';
import * as styles from './style.module.css';
import closeIcon from '../icons/close.svg';

interface RegistrationProps {
  onClose: () => void;
  onSuccess: () => void;
  prefillData?: {
    email?: string;
    password?: string;
  };
}

const RegisterPopup: React.FC<RegistrationProps> = ({ onClose, onSuccess, prefillData }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: prefillData?.email || '',
    phone: '',
    password: prefillData?.password || '',
    confirmPassword: prefillData?.password || '',
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
    <div className={ styles.popup }>
      <img src={closeIcon} onClick={onClose} alt='Close' className={styles.closeIcon} />
      <h2 className={ styles.title }>РЕГИСТРАЦИЯ АККАУНТА</h2>
      <p className={ styles.description }>
        Заполните поля для регистрации нового аккаунта в системе.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="ФИО (не обязательно к заполнению)"
          value={formData.name}
          onChange={handleChange}
          className={ styles.input }
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail адрес"
          value={formData.email}
          onChange={handleChange}
          className={ styles.input }
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Телефон в формате +7 (xxx) xxx – xx – xx"
          value={formData.phone}
          onChange={handleChange}
          className={ styles.input }
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
          className={ styles.input }
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Подтверждение пароля"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={ styles.input }
          required
        />
        <div className='checkboxContainer'>
          <input
            type="checkbox"
            name="agreed"
            id="agreement"
            checked={formData.agreed}
            onChange={handleChange}
            className={ styles.checkbox }
            required
          />
          <label htmlFor="agreement" className={ styles.checkboxLabel }>
            Я ПРОЧИТАЛ И СОГЛАСЕН С ПРАВИЛАМИ ИСПОЛЬЗОВАНИЯ ПЕРСОНАЛЬНЫХ ДАННЫХ
          </label>
        </div>
        <button type="submit" className={`${styles.button} ${styles.primaryButton}`}>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default RegisterPopup;