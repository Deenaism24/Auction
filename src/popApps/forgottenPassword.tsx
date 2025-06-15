import React, { useState } from 'react'; // Импорт хуков React (useState)
import * as styles from './style.module.css';
import closeIcon from '../icons/close.svg';

// Интерфейс пропсов для компонента ForgottenPassword
interface ForgottenPasswordProps {
  onClose: () => void; // Функция для закрытия попапа
  onSuccess: () => void; // Функция, вызываемая при успешной отправке запроса (пока заглушка)
}

// Компонент попапа для восстановления забытого пароля
const ForgottenPassword: React.FC<ForgottenPasswordProps> = ({ onClose, onSuccess }) => {
  // Состояние для хранения введенного E-mail адреса
  const [email, setEmail] = useState('');

  // Обработчик отправки формы (сейчас заглушка)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Реализовать логику отправки запроса на восстановление пароля (валидация, отправка на сервер)
    console.log('Forgotten password form submitted for email:', email);
    // При успешной отправке вызвать onSuccess() и onClose()
    onSuccess(); // Вызываем onSuccess как будто отправка прошла успешно
  };

  // Рендеринг попапа восстановления пароля
  return (
    <div className={styles.popup}> {/* Контейнер попапа */}
      {/* Иконка закрытия */}
      <img src={closeIcon} onClick={onClose} alt='Close' className={styles.closeIcon} />
      {/* Заголовок попапа */}
      <div className={styles.title}> ЗАБЫЛИ ПАРОЛЬ </div>
      {/* Основное содержимое попапа */}
      <div className={styles.content}>
        {/* Описание - просьба ввести E-mail */}
        <p className={styles.description}>
          Пожалуйста, укажите Ваш E-mail адрес для восстановления пароля.
        </p>
        {/* Форма ввода E-mail */}
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Поле для ввода E-mail */}
          <input
            type="email"
            placeholder="E-mail"
            value={email} // Значение из состояния
            onChange={(e) => setEmail(e.target.value)} // Обработчик изменения
            className={styles.input}
            required // Поле обязательно
          />
          {/* Кнопка отправки формы */}
          <button type="submit" className={`${styles.mainButton} ${styles.active}`}>
            Продолжить
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgottenPassword;