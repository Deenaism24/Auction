import React from 'react';
// !!! ИМПОРТИРУЕМ NAVLINK, USEDISPATCH И SETAUTHENTICATED !!!
import { useNavigate } from 'react-router-dom'; // Добавим useNavigate для редиректа после выхода
import { useDispatch, useSelector } from 'react-redux';
import { setAuthenticated } from '../../store/slices/userSlice'; // Импортируем экшен для выхода
import { RootState } from '../../store'; // Импортируем RootState для useSelector
import OutIcon from '../../icons/out.svg'; // Иконка ЛК (будет использоваться для Выхода)
// !!! КОНЕЦ ИМПОРТА !!!
import * as styles from './Footer.module.css';
import { useAuthModal } from '../../contexts/AuthFlowModalContext';
import { routes } from '../../routes';
import { downloadEmptyPdf } from '../../utils/downloadPDF';
import { useConfirmationModal } from '../../contexts/ConfirmationModalContext';

import AuthIcon from '../../icons/enter.svg'; // Иконка для LOG IN


const Footer: React.FC = () => {
  const { open } = useAuthModal();
  const { openConfirmation } = useConfirmationModal();
  const navigate = useNavigate(); // Получаем navigate для редиректа
  // !!! ЧТЕНИЕ СОСТОЯНИЯ АВТОРИЗАЦИИ ИЗ REDUX !!!
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  // !!! ПОЛУЧЕНИЕ DISPATCH !!!
  const dispatch = useDispatch();
  // !!! КОНЕЦ ЧТЕНИЯ СОСТОЯНИЯ И ПОЛУЧЕНИЯ DISPATCH !!!


  const handleLoginClick = () => {
    open('login');
  };

  // !!! НОВАЯ ФУНКЦИЯ ДЛЯ ВЫХОДА !!!
  const handleLogoutClick = () => {
    // Диспатчим экшен для установки статуса авторизации в false
    dispatch(setAuthenticated(false));

    // Опционально: удалить сохраненные данные авторизации (например, токены) из LocalStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('authToken'); // Если вы использовали для сохранения

    // Опционально: перенаправить пользователя на главную страницу или страницу входа после выхода
    navigate(routes.home);
    console.log('Пользователь вышел.');

    // Возможно, также нужно очистить данные пользователя или избранного из Redux,
    // если они должны быть привязаны только к авторизованной сессии.
    // dispatch(clearUserData()); // Пример экшена для очистки данных пользователя
    // dispatch(clearFavorites()); // Пример экшена для очистки избранного
  };
  // !!! КОНЕЦ НОВОЙ ФУНКЦИИ !!!


  const handleDownloadClick = async (linkText: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }

    const filename = `${linkText.replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, '_')}.pdf`;
    const message = 'Скачать файл';

    const confirmed = await openConfirmation(message, filename);

    if (confirmed) {
      downloadEmptyPdf(filename);
    }
  };


  return (
    <>
      <footer className={styles.footer}>
        {/* Support Column (оставляем как есть) */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>SUPPORT</h3>
          {routes.footerLinks.support.map(link => (
            <div
              key={link.path}
              className={styles.link}
              onClick={(e) => handleDownloadClick(link.text, e)}
              style={{ cursor: 'pointer' }}
            >
              {link.text}
            </div>
          ))}
        </div>

        {/* Corporate Column (оставляем как есть) */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>CORPORATE</h3>
          {routes.footerLinks.corporate.map(link => (
            <div
              key={link.path}
              className={styles.link}
              onClick={(e) => handleDownloadClick(link.text, e)}
              style={{ cursor: 'pointer' }}
            >
              {link.text}
            </div>
          ))}
        </div>

        {/* More Column (оставляем как есть) */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>MORE...</h3>
          {routes.footerLinks.more.map(link => (
            <div
              key={link.path}
              className={styles.link}
              onClick={(e) => handleDownloadClick(link.text, e)}
              style={{ cursor: 'pointer' }}
            >
              {link.text}
            </div>
          ))}
        </div>

        {/* !!! УСЛОВНЫЙ РЕНДЕРИНГ: LOG IN ИЛИ ВЫХОД !!! */}
        {isAuthenticated ? (
          // Если авторизован - кнопка Выход (div с обработчиком клика)
          <div onClick={handleLogoutClick} className={styles.auth}> {/* Используем стиль .auth */}
            {/* Текст "Выход" */}
            <div className={styles.login}>ВЫХОД</div> {/* Переиспользуем стиль для текста, изменив текст */}
            {/* Иконка - можно использовать иконку ЛК или найти иконку выхода */}
            <img src={OutIcon} alt="Выход" className={styles.icon} /> {/* Используем иконку ЛК */}
          </div>
        ) : (
          // Если не авторизован - кнопка LOG IN (div с обработчиком клика)
          <div onClick={handleLoginClick} className={styles.auth}>
            <div className={styles.login}>LOG IN</div>
            <img src={AuthIcon} alt="Вход" className={styles.icon} />
          </div>
        )}
        {/* !!! КОНЕЦ УСЛОВНОГО РЕНДЕРИНГА !!! */}

      </footer>
    </>
  );
};

export default Footer;