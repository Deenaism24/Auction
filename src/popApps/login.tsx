// src/popApps/LoginPopup.tsx
import React, { useState, useRef, useEffect } from 'react'; // Импорт хуков React (useState, useRef, useEffect)
// ИМПОРТЫ ДЛЯ REDUX для авторизации
import { useDispatch } from 'react-redux'; // Хук для диспатча экшенов Redux
import { setAuthenticated } from '../store/slices/userSlice'; // Экшен для установки статуса авторизации
import { AppDispatch } from '../store'; // Тип диспатча (для типизации)

import * as styles from './style.module.css';

import closeIcon from '../icons/close.svg';
import eyeIcon from '../icons/eye.svg';
import closedEyeIcon from '../icons/closedEye.svg';
// Импорт хука для работы с контекстом модального потока авторизации (для открытия других попапов)
import { useAuthModal } from '../contexts/AuthFlowModalContext';

// Интерфейс пропсов для компонента LoginPopup
interface LoginPopupProps {
  onClose: () => void; // Функция для закрытия попапа
}

// Компонент попапа авторизации (входа)
const LoginPopup: React.FC<LoginPopupProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>(); // Получаем функцию dispatch для Redux
  const { open } = useAuthModal(); // Получаем функцию 'open' из контекста для открытия других попапов (регистрация, забыли пароль)

  // Состояния для полей ввода Email и пароля
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Состояние видимости пароля

  // Состояние для стилизации активной кнопки (Авторизироваться/Создать аккаунт).
  // В текущей реализации всегда активно "Авторизироваться".
  const [activeButton, setActiveButton] = useState<'login' | 'create'>('login');

  // Состояние для сообщения об ошибке (например, при неверных учетных данных)
  const [error, setError] = useState('');

  // Реф для контейнера попапа. Используется для обработки кликов вне попапа.
  const popupRef = useRef<HTMLDivElement>(null);

  // Обработчик отправки формы авторизации
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // Предотвращаем стандартное поведение браузера при отправке формы

    // Дефолтные учетные данные для демонстрации
    const DEFAULT_LOGIN_EMAIL = 'admin@a.ru';
    const DEFAULT_PASSWORD = 'admin';

    // Проверка учетных данных (сейчас только для дефолтных)
    if (email === DEFAULT_LOGIN_EMAIL && password === DEFAULT_PASSWORD) {
      // Успешная авторизация
      dispatch(setAuthenticated(true)); // Диспатчим экшен в Redux: пользователь авторизован
      setError(''); // Сбрасываем сообщение об ошибке
      onClose(); // Закрываем модальное окно
      console.log('Авторизация успешна!');
    } else {
      // Неудачная авторизация
      setError('Неверный E-mail или пароль.'); // Устанавливаем сообщение об ошибке
      console.log('Авторизация не удалась.');
    }
  };

  // Функция для переключения видимости поля пароля
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Обработчик клика по кнопке "Создать новый аккаунт"
  const handleCreateAccountClick = () => {
    // Открываем модальное окно регистрации, используя контекст
    open('register'/*, { email, password }*/);
    // Меняем состояние для стилизации кнопки
    setActiveButton('create');
  };

  // Эффект для обработки кликов вне попапа и нажатия клавиши Escape для закрытия
  useEffect(() => {
    // Обработчик клика вне элемента с рефом popupRef
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose(); // Закрываем попап
      }
    };

    // Обработчик нажатия клавиши Escape
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose(); // Закрываем попап
      }
    };

    // Добавляем слушателей событий при монтировании компонента
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    // Функция очистки: удаляем слушателей событий при размонтировании компонента
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]); // Зависимость: эффект должен повторно создаваться, если меняется onClose (обычно она стабильна)

  // Рендеринг попапа авторизации
  return (
    <div className={styles.popup} ref={popupRef}> {/* Контейнер попапа с рефом */}
      {/* Иконка закрытия */}
      <img src={closeIcon} onClick={onClose} alt='Close' className={styles.closeIcon} />
      {/* Заголовок попапа */}
      <div className={styles.title}> АВТОРИЗАЦИЯ</div>

      {/* Основное содержимое попапа */}
      <div className={styles.content}>
        {/* Описание */}
        <p className={styles.description}>
          Войдите в свою учетную запись, чтобы делать ставки и регистрироваться для участия в продажах.
        </p>

        {/* Форма входа */}
        <form onSubmit={handleLogin} className={styles.form}> {/* При отправке формы вызывается handleLogin */}
          {/* Поле для ввода Email */}
          <div className={styles.inputContainer}>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Обновляем состояние email
              className={styles.input}
              required // Поле обязательно
              autoComplete="email" // Подсказка браузеру для автозаполнения
            />
          </div>

          {/* Поле для ввода пароля с кнопкой скрытия/показа */}
          <div className={styles.inputContainer}>
            <input
              type={showPassword ? "text" : "password"} // Тип поля зависит от состояния showPassword
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Обновляем состояние password
              className={styles.input}
              required // Поле обязательно
              autoComplete="current-password" // Подсказка браузеру для автозаполнения
            />
            {/* Кнопка переключения видимости пароля */}
            <button
              type="button" // Важно: type="button" чтобы не сабмитить форму при клике на эту кнопку
              className={styles.passwordToggle}
              onClick={togglePasswordVisibility} // Переключаем видимость
              aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'} // Для доступности
            >
              {/* Иконка глаза */}
              <img
                src={showPassword ? eyeIcon : closedEyeIcon} // Выбор иконки
                alt="Toggle password visibility"
                className={styles.eyeIcon}
              />
            </button>
          </div>

          {/* Сообщение об ошибке (отображается, если есть текст ошибки в состоянии) */}
          {error && <div className={styles.errorMessage}>{error}</div>}

          {/* Кнопка "ЗАБЫЛИ ВАШ ПАРОЛЬ?" */}
          <button
            type="button" // Важно: type="button"
            className={styles.forgotPasswordButton}
            onClick={() => open('forgot-password')} // Открывает попап восстановления пароля через контекст
          >
            ЗАБЫЛИ ВАШ ПАРОЛЬ?
          </button>

          {/* Контейнер кнопок "Авторизироваться" и "Создать новый аккаунт" */}
          <div className={styles.buttons}>
            {/* Кнопка "Авторизироваться" */}
            {/* type="submit" - эта кнопка отправляет форму */}
            <button
              type="submit"
              className={`${styles.mainButton} ${activeButton === 'login' ? styles.active : ''}`} // Активный стиль, если 'login'
            >
              Авторизироваться
            </button>

            {/* Кнопка "Создать новый аккаунт" */}
            {/* type="button" - эта кнопка не отправляет форму */}
            <button
              type="button"
              className={`${styles.mainButton} ${activeButton === 'create' ? styles.active : ''}`} // Активный стиль, если 'create'
              onClick={handleCreateAccountClick} // Вызывает функцию для открытия регистрации
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