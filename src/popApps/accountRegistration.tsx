import React, { useState } from 'react'; // Импорт хуков React (useState)
import * as styles from './style.module.css';

import closeIcon from '../icons/close.svg';
import eyeIcon from '../icons/eye.svg';
import closedEyeIcon from '../icons/closedEye.svg';

// Интерфейс пропсов для компонента регистрации
interface RegistrationProps {
  onClose: () => void; // Функция для закрытия попапа
  onSuccess: () => void; // Функция, вызываемая при успешной регистрации (заглушка)
  prefillData?: { // Опциональные данные для предзаполнения полей (например, из формы входа)
    email?: string;
    password?: string;
  };
}

// Компонент попапа регистрации аккаунта
const RegisterPopup: React.FC<RegistrationProps> = ({ onClose, onSuccess, prefillData }) => {
  // Состояние формы (поля ввода и чекбокс согласия)
  const [formData, setFormData] = useState({
    name: '',
    email: prefillData?.email || '', // Предзаполнение email, если передан
    phone: '',
    password: prefillData?.password || '', // Предзаполнение пароля, если передан
    confirmPassword: prefillData?.password || '', // Предзаполнение подтверждения пароля
    agreed: false // Состояние чекбокса согласия
  });

  // Отдельные состояния для полей пароля и их видимости (используются в inputContainer)
  const [password1, setPassword1] = useState(prefillData?.password || ''); // Пароль
  const [showPassword1, setShowPassword1] = useState(false); // Видимость пароля
  const [password2, setPassword2] = useState(prefillData?.password || ''); // Подтверждение пароля
  const [showPassword2, setShowPassword2] = useState(false); // Видимость подтверждения пароля

  // Функции для переключения видимости полей пароля
  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  // Обработчик отправки формы (сейчас заглушка)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', formData, { password: password1, confirmPassword: password2 });
    // При успешной регистрации вызвать onSuccess()
    onSuccess(); // Вызываем onSuccess как будто регистрация прошла успешно
  };

  // Общий обработчик изменения полей формы (кроме паролей, если они в отдельных стейтах)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value // Обработка чекбокса и текстовых полей
    }));
  };

  // Рендеринг попапа регистрации
  return (
    <div className={ styles.popup }> {/* Контейнер попапа */}
      {/* Иконка закрытия */}
      <img src={closeIcon} onClick={onClose} alt='Close' className={styles.closeIcon} />
      {/* Заголовок попапа */}
      <div className={ styles.title }>РЕГИСТРАЦИЯ АККАУНТА</div>
      {/* Основное содержимое попапа */}
      <div className={styles.content}>
        {/* Описание формы */}
        <p className={ styles.description }>
          Заполните поля для регистрации нового аккаунта в системе.
        </p>
        {/* Форма регистрации */}
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Поле ФИО (необязательно) */}
          <input
            type="text"
            name="name" // Имя поля для handleChange
            placeholder="ФИО (не обязательно к заполнению)"
            value={formData.name} // Значение из состояния
            onChange={handleChange} // Обработчик изменения
            className={ styles.input }
          />
          {/* Поле E-mail */}
          <input
            type="email"
            name="email"
            placeholder="E-mail адрес"
            value={formData.email}
            onChange={handleChange}
            className={ styles.input }
            required // Поле обязательно
          />
          {/* Поле Телефон */}
          <input
            type="tel"
            name="phone"
            placeholder="Телефон в формате +7 (xxx) xxx – xx – xx"
            value={formData.phone}
            onChange={handleChange}
            className={ styles.input }
            required // Поле обязательно
          />
          {/* Поле Пароль с кнопкой скрытия/показа */}
          <div className={styles.inputContainer}>
            <input
              type={showPassword1 ? "text" : "password"} // Тип поля зависит от состояния showPassword1
              placeholder="Пароль"
              value={password1} // Значение из отдельного состояния password1
              onChange={(e) => setPassword1(e.target.value)} // Обновление отдельного состояния
              className={styles.input}
              required
            />
            {/* Кнопка переключения видимости пароля */}
            <button
              type="button" // Важно: type="button" чтобы не сабмитить форму
              className={styles.passwordToggle}
              onClick={togglePasswordVisibility1}
            >
              {/* Иконка глаза */}
              <img
                src={showPassword1 ? eyeIcon : closedEyeIcon} // Выбор иконки
                alt="Toggle password visibility"
                className={styles.eyeIcon}
              />
            </button>
          </div>
          {/* Поле Подтверждение пароля с кнопкой скрытия/показа */}
          <div className={styles.inputContainer}>
            <input
              type={showPassword2 ? "text" : "password"} // Тип поля зависит от состояния showPassword2
              placeholder="Подтверждение пароля"
              value={password2} // Значение из отдельного состояния password2
              onChange={(e) => setPassword2(e.target.value)} // Обновление отдельного состояния
              className={styles.input}
              required
            />
            {/* Кнопка переключения видимости пароля */}
            <button
              type="button" // Важно: type="button"
              className={styles.passwordToggle}
              onClick={togglePasswordVisibility2}
            >
              {/* Иконка глаза */}
              <img
                src={showPassword2 ? eyeIcon : closedEyeIcon} // Выбор иконки
                alt="Toggle password visibility"
                className={styles.eyeIcon}
              />
            </button>
          </div>
          {/* Дополнительная информация под полями пароля */}
          <div className={styles.checkboxContainer}> {/* Используем стиль checkboxContainer для выравнивания */}
            *
            <label htmlFor="agreement" className={ styles.additionalLabel }>
              Ваш логин формируется автоматически по названию электронной почты
            </label>
          </div>
          {/* Чекбокс согласия с правилами */}
          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              name="agreed"
              id="agreement" // ID для связывания с label
              checked={formData.agreed} // Состояние чекбокса
              onChange={handleChange} // Обработчик изменения
              className={ styles.checkbox }
              required // Обязателен для регистрации
            />
            {/* Лейбл для чекбокса */}
            <label htmlFor="agreement" className={styles.checkboxLabel}>
              <div>
                Я ПРОЧИТАЛ И СОГЛАСЕН С{' '}
                <span className={styles.underline}>
                ПРАВИЛАМИ ИСПОЛЬЗОВАНИЯ ПЕРСОНАЛЬНЫХ ДАННЫХ
              </span>
              </div>
            </label>
          </div>
          {/* Кнопка отправки формы */}
          <button type="submit" className={`${styles.mainButton} ${styles.active}`}>
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPopup;