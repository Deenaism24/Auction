// src/popApps/LoginPopup.tsx
import React, { useState, useRef, useEffect } from 'react';
// !!! ИМПОРТИРУЕМ REDUX ХУКИ И ЭКШЕН !!!
import { useDispatch } from 'react-redux';
import { setAuthenticated } from '../store/slices/userSlice';
import { AppDispatch } from '../store'; // Импортируем тип AppDispatch для типизации dispatch
// !!! КОНЕЦ ИМПОРТА !!!
import * as styles from './style.module.css'; // Убедитесь, что путь правильный
import closeIcon from '../icons/close.svg';
import eyeIcon from '../icons/eye.svg';
import closedEyeIcon from '../icons/closedEye.svg';
import { useAuthModal } from '../contexts/AuthFlowModalContext';


interface LoginPopupProps {
  onClose: () => void; // Пропc для закрытия модалки
}

const LoginPopup: React.FC<LoginPopupProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>(); // Получаем функцию dispatch
  const { open } = useAuthModal(); // open используется для 'forgot-password' и 'register'

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeButton, setActiveButton] = useState<'login' | 'create'>('login'); // Этот state, кажется, для стилизации кнопок переключения
  const [error, setError] = useState(''); // !!! ДОБАВЛЕНО СОСТОЯНИЕ ОШИБКИ !!!

  const popupRef = useRef<HTMLDivElement>(null);

  // !!! ИЗМЕНЕННЫЙ ОБРАБОТЧИК handleLogin !!!
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // Предотвращаем стандартную отправку формы

    // Дефолтные учетные данные
    const DEFAULT_LOGIN_EMAIL = 'admin@a.ru'; // Используем admin для email, как вы просили
    const DEFAULT_PASSWORD = 'admin';

    // Проверяем дефолтную авторизацию
    if (email === DEFAULT_LOGIN_EMAIL && password === DEFAULT_PASSWORD) {
      // Успешная авторизация
      dispatch(setAuthenticated(true)); // Диспатчим экшен Redux для установки статуса авторизации
      setError(''); // Сбрасываем сообщение об ошибке
      // Очистить поля формы после успешного входа?
      // setEmail('');
      // setPassword('');
      onClose(); // Закрываем модалку
      console.log('Авторизация успешна!');

      // Опционально: Сохранить статус авторизации в LocalStorage
      // localStorage.setItem('isAuthenticated', 'true');
      // localStorage.setItem('authToken', 'fake-admin-token'); // Пример
    } else {
      // Неудачная авторизация
      setError('Неверный E-mail или пароль.'); // Устанавливаем сообщение об ошибке
      // Очистить поля пароля при неудачной попытке? setPassword('');
      console.log('Авторизация не удалась.');
    }
  };
  // !!! КОНЕЦ ИЗМЕНЕННОГО ОБРАБОТЧИКА handleLogin !!!


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // При клике на "Создать новый аккаунт" открываем модалку регистрации
  const handleCreateAccountClick = () => {
    // open('register', { email, password }); // Возможно, передавать email и password не нужно
    open('register');
    // Очистить поля формы входа при переключении на регистрацию?
    // setEmail('');
    // setPassword('');
    // setError('');
    setActiveButton('create'); // Обновляем активную кнопку
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
    <div className={styles.popup} ref={popupRef}>
      <img src={closeIcon} onClick={onClose} alt='Close' className={styles.closeIcon} />
      <div className={styles.title}> АВТОРИЗАЦИЯ</div>

      <div className={styles.content}>
        <p className={styles.description}>
          Войдите в свою учетную запись, чтобы делать ставки и регистрироваться для участия в продажах.
        </p>

        {/* !!! ФОРМА ВХОДА !!! */}
        <form onSubmit={handleLogin} className={styles.form}> {/* onSubmit вызывает handleLogin */}
          <div className={styles.inputContainer}>
            <input
              type="email" // Поле для Email
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
              autoComplete="email" // Помогает браузеру предложить сохраненный email
            />
          </div>

          <div className={styles.inputContainer}>
            <input
              type={showPassword ? "text" : "password"} // Переключаем тип для показа/скрытия пароля
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
              autoComplete="current-password" // Помогает браузеру предложить пароль
            />
            <button
              type="button" // Важно: type="button" чтобы не сабмитить форму при клике
              className={styles.passwordToggle}
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
            >
              <img
                src={showPassword ? eyeIcon : closedEyeIcon}
                alt="Toggle password visibility"
                className={styles.eyeIcon}
              />
            </button>
          </div>

          {/* !!! СООБЩЕНИЕ ОБ ОШИБКЕ !!! */}
          {error && <div className={styles.errorMessage}>{error}</div>} {/* Отображаем ошибку */}
          {/* !!! КОНЕЦ СООБЩЕНИЯ ОБ ОШИБКЕ !!! */}

          <button
            type="button" // type="button" чтобы не сабмитить форму при клике на эту кнопку
            className={styles.forgotPasswordButton}
            onClick={() => open('forgot-password')}
          >
            ЗАБЫЛИ ВАШ ПАРОЛЬ?
          </button>

          <div className={styles.buttons}>
            {/* Кнопка "Авторизироваться" - type="submit" формы */}
            <button
              type="submit" // Ключевой момент: эта кнопка сабмитит форму
              className={`${styles.mainButton} ${activeButton === 'login' ? styles.active : ''}`}
              // Удален onClick={handleLoginClick} чтобы логика входа срабатывала только по onSubmit формы
            >
              Авторизироваться
            </button>

            {/* Кнопка "Создать новый аккаунт" - type="button" */}
            <button
              type="button" // type="button" чтобы не сабмитить форму
              className={`${styles.mainButton} ${activeButton === 'create' ? styles.active : ''}`}
              onClick={handleCreateAccountClick} // Вызывает переход на регистрацию
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