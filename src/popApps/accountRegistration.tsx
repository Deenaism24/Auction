import React, { useState } from 'react';
import * as styles from './style.module.css';
import closeIcon from '../icons/close.svg';
import eyeIcon from '../icons/eye.svg';
import closedEyeIcon from '../icons/closedEye.svg';

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
      <div className={ styles.title }>РЕГИСТРАЦИЯ АККАУНТА</div>
      <div className={styles.content}>
        <p className={ styles.description }>
          Заполните поля для регистрации нового аккаунта в системе.
        </p>
        <form onSubmit={handleSubmit} className={styles.form}>
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
          <div className={styles.inputContainer}>
            <input
              type={showPassword1 ? "text" : "password"}
              placeholder="Пароль"
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
              placeholder="Подтверждение пароля"
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
          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              name="agreed"
              id="agreement"
              checked={formData.agreed}
              onChange={handleChange}
              className={ styles.checkbox }
              required
            />
            <label htmlFor="agreement" className={styles.checkboxLabel}>
              <div>
              Я ПРОЧИТАЛ И СОГЛАСЕН С{' '}
              <span className={styles.underline}>
                ПРАВИЛАМИ ИСПОЛЬЗОВАНИЯ ПЕРСОНАЛЬНЫХ ДАННЫХ
              </span>
              </div>
            </label>
          </div>
          <div className={styles.checkboxContainer}>
            *
            <label htmlFor="agreement" className={ styles.additionalLabel }>
              Ваш логин формируется автоматически по названию электронной почты
            </label>
          </div>
          <button type="submit" className={`${styles.mainButton} ${styles.active}`}>
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPopup;