// src/widgets/footer/index.tsx

import React from 'react';
// Импорты для Redux (для управления статусом авторизации)
import { useNavigate } from 'react-router-dom'; // Хук для навигации
import { useDispatch, useSelector } from 'react-redux'; // Хуки для работы с Redux
import { setAuthenticated } from '../../store/slices/userSlice'; // Экшен для сброса статуса авторизации
import { RootState } from '../../store'; // Тип корневого состояния Redux

import OutIcon from '../../icons/out.svg';
import AuthIcon from '../../icons/enter.svg';

import * as styles from './Footer.module.css';
import { useAuthModal } from '../../contexts/AuthFlowModalContext'; // Хук для модального окна авторизации
import { routes } from '../../routes'; // Объект с путями роутов
import { downloadEmptyPdf } from '../../utils/downloadPDF'; // Утилита для скачивания пустого PDF
import { useConfirmationModal } from '../../contexts/ConfirmationModalContext'; // Хук для модального окна подтверждения

// Компонент футера
const Footer: React.FC = () => {
  const { open } = useAuthModal(); // Получаем функцию для открытия модалки авторизации
  const { openConfirmation } = useConfirmationModal(); // Получаем функцию для открытия модалки подтверждения
  const navigate = useNavigate(); // Получаем функцию для навигации между страницами
  // ЧТЕНИЕ СОСТОЯНИЯ АВТОРИЗАЦИИ ИЗ REDUX
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  // ПОЛУЧЕНИЕ DISPATCH ФУНКЦИИ ИЗ REDUX
  const dispatch = useDispatch();

  // Обработчик клика по кнопке "LOG IN"
  const handleLoginClick = () => {
    open('login'); // Открываем модальное окно авторизации
  };

  // НОВАЯ ФУНКЦИЯ ДЛЯ ВЫХОДА ИЗ АККАУНТА
  const handleLogoutClick = () => {
    // Диспатчим экшен для установки статуса авторизации в false в Redux
    dispatch(setAuthenticated(false));

    // Перенаправляем пользователя на главную страницу после выхода
    navigate(routes.home);
    console.log('Пользователь вышел.');
  };

  // Обработчик клика по ссылкам скачивания PDF
  const handleDownloadClick = async (linkText: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault(); // Предотвращаем стандартное поведение ссылки
    }

    // Формируем имя файла из текста ссылки
    const filename = `${linkText.replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, '_')}.pdf`;
    const message = 'Скачать файл';

    // Открываем модальное окно подтверждения скачивания
    const confirmed = await openConfirmation(message, filename);

    // Если пользователь подтвердил, скачиваем пустой PDF
    if (confirmed) {
      downloadEmptyPdf(filename);
    }
  };

  // Рендеринг компонента футера
  return (
    <>
      <footer className={styles.footer}>
        {/* Колонка "SUPPORT" */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>SUPPORT</h3>
          {/* Проходим по ссылкам из данных роутов и рендерим их */}
          {routes.footerLinks.support.map(link => (
            <div
              key={link.path} // Ключ для React
              className={styles.link} // Стили ссылки
              onClick={(e) => handleDownloadClick(link.text, e)} // Обработчик клика для скачивания
            >
              {link.text} {/* Текст ссылки */}
            </div>
          ))}
        </div>

        {/* Колонка "CORPORATE" */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>CORPORATE</h3>
          {/* Проходим по ссылкам и рендерим их */}
          {routes.footerLinks.corporate.map(link => (
            <div
              key={link.path}
              className={styles.link}
              onClick={(e) => handleDownloadClick(link.text, e)}
            >
              {link.text}
            </div>
          ))}
        </div>

        {/* Колонка "MORE..." */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>MORE...</h3>
          {/* Проходим по ссылкам и рендерим их */}
          {routes.footerLinks.more.map(link => (
            <div
              key={link.path}
              className={styles.link}
              onClick={(e) => handleDownloadClick(link.text, e)}
            >
              {link.text}
            </div>
          ))}
        </div>

        {/* РЕНДЕРИНГ КНОПКИ АВТОРИЗАЦИИ ИЛИ ВЫХОДА */}
        {isAuthenticated ? (
          // Если пользователь авторизован, показываем кнопку "ВЫХОД"
          <div onClick={handleLogoutClick} className={styles.auth}> {/* Кликабельный контейнер */}
            <div className={styles.login}>ВЫХОД</div> {/* Текст кнопки */}
            <img src={OutIcon} alt="Выход" className={styles.icon} /> {/* Иконка выхода */}
          </div>
        ) : (
          // Если пользователь не авторизован, показываем кнопку "LOG IN"
          <div onClick={handleLoginClick} className={styles.auth}>
            <div className={styles.login}>LOG IN</div>
            <img src={AuthIcon} alt="Вход" className={styles.icon} /> {/* Иконка входа */}
          </div>
        )}

      </footer>
    </>
  );
};

export default Footer;