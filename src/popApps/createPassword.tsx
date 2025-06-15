import React, { useState } from 'react'; // Импорт хуков React (useState)
import * as styles from './style.module.css';

import closeIcon from '../icons/close.svg';
import eyeIcon from '../icons/eye.svg';
import closedEyeIcon from '../icons/closedEye.svg';

// Интерфейс пропсов для компонента создания пароля
interface CreatePasswordProps {
  onClose: () => void; // Функция для закрытия попапа
  onSuccess: () => void; // Функция, вызываемая при успешном создании пароля (пока заглушка)
}

// Компонент попапа для создания нового пароля (например, после сброса)
const CreatePassword: React.FC<CreatePasswordProps> = ({ onClose, onSuccess }) => {
  // Состояния для полей ввода нового пароля и подтверждения пароля
  const [password1, setPassword1] = useState(''); // Новый пароль
  const [showPassword1, setShowPassword1] = useState(false); // Видимость нового пароля
  const [password2, setPassword2] = useState(''); // Подтверждение пароля
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
    console.log('Create password submitted:', { password: password1, confirmPassword: password2 });
    onSuccess(); // Вызываем onSuccess как будто операция прошла успешно
  };

  // Рендеринг попапа создания пароля
  return (
    <div className={styles.popup}> {/* Контейнер попапа */}
      {/* Иконка закрытия */}
      <img src={closeIcon} onClick={onClose} alt='Close' className={styles.closeIcon} />
      {/* Заголовок попапа */}
      <h2 className={styles.title}>СОЗДАТЬ ПАРОЛЬ</h2>
      {/* Описание */}
      <p className={styles.description}>
        Войдите в свою учетную запись, чтобы делать ставки и регистрироваться для участия в продажах. {/* Возможно, текст описания здесь не совсем подходит для "СОЗДАТЬ ПАРОЛЬ" */}
      </p>
      {/* Форма создания пароля */}
      <form onSubmit={handleSubmit} className={styles.form}>

        {/* Поле для ввода нового пароля с кнопкой скрытия/показа */}
        <div className={styles.inputContainer}>
          <input
            type={showPassword1 ? "text" : "password"} // Тип поля зависит от состояния showPassword1
            placeholder="Новый пароль"
            value={password1} // Значение из состояния password1
            onChange={(e) => setPassword1(e.target.value)} // Обработчик изменения
            className={styles.input}
            required // Поле обязательно
          />
          {/* Кнопка переключения видимости */}
          <button
            type="button" // Важно: type="button"
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
        {/* Поле для подтверждения пароля с кнопкой скрытия/показа */}
        <div className={styles.inputContainer}>
          <input
            type={showPassword2 ? "text" : "password"} // Тип поля зависит от состояния showPassword2
            placeholder="Подтвердите пароль"
            value={password2} // Значение из состояния password2
            onChange={(e) => setPassword2(e.target.value)} // Обработчик изменения
            className={styles.input}
            required // Поле обязательно
          />
          {/* Кнопка переключения видимости */}
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
        {/* Кнопка отправки формы */}
        <button type="submit" className={`${styles.mainButton} ${styles.active}`}>
          Создать новый пароль
        </button>
      </form>
    </div>
  );
};

export default CreatePassword;