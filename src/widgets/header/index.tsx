// src/widgets/header/index.tsx

import React, { useState, useEffect, useRef } from 'react'; // Импорт хуков React
import { HashLink } from 'react-router-hash-link'; // Компонент для ссылок с хэшами (плавный скролл)
import { NavLink, useLocation, useNavigate, generatePath } from 'react-router-dom'; // Хуки и компоненты для маршрутизации

import AuthIcon from '../../icons/enter.svg';
import SearchIcon from '../../icons/search.svg';
import StarIcon from '../../icons/star.svg';
import BurgerIcon from '../../icons/burger.svg';
import * as styles from './Header.module.css';
// Импорт хука для работы с контекстом модального потока авторизации
import { useAuthModal } from '../../contexts/AuthFlowModalContext';
import { routes } from '../../routes'; // Объект с путями роутов
import articlesList from '../../articlesList'; // Импорт списка статей (для кнопки DISCOVER)
// ИМПОРТЫ ДЛЯ REDUX (для статуса авторизации и выхода)
import { useSelector, useDispatch } from 'react-redux'; // Хуки для работы с Redux
import { RootState } from '../../store'; // Тип корневого состояния Redux
import { setAuthenticated } from '../../store/slices/userSlice'; // Экшен для сброса статуса авторизации (при выходе)

// Интерфейс пропсов для компонента Header
interface HeaderProps {
  searchInputRef: React.RefObject<HTMLInputElement | null>; // Реф для поля поиска (для фокусировки)
}

// Компонент хедера (шапки сайта)
const Header: React.FC<HeaderProps> = ({ searchInputRef }) => {
  const { open } = useAuthModal(); // Получаем функцию для открытия модалки авторизации/регистрации
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Состояние: открыто ли бургер-меню
  const menuRef = useRef<HTMLDivElement>(null); // Реф для самого бургер-меню (для обработки кликов вне его)
  const burgerRef = useRef<HTMLImageElement>(null); // Реф для иконки бургера (для исключения ее из области "вне меню")
  const location = useLocation(); // Хук для получения информации о текущем URL
  const navigate = useNavigate(); // Хук для программной навигации

  // ЧТЕНИЕ СОСТОЯНИЯ АВТОРИЗАЦИИ ИЗ REDUX STORE
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  // ПОЛУЧЕНИЕ DISPATCH ФУНКЦИИ ИЗ REDUX
  const dispatch = useDispatch();

  // Проверяем, находимся ли мы на странице информации
  const isInformationPage = location.pathname === routes.information;

  // Обработчик клика по логотипу
  const handleLogoClick = () => {
    // Если уже на главной, прокручиваем вверх
    if (location.pathname === routes.home) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Иначе переходим на главную страницу
      navigate(routes.home);
    }
    closeMenu(); // Закрываем бургер-меню (если открыто)
  };

  // Обработчик клика по кнопке "Авторизация"
  const handleLoginClick = () => {
    setIsMenuOpen(false); // Закрываем бургер-меню
    open('login'); // Открываем модалку авторизации/регистрации через контекст
  };

  // Функция для перехода на страницу личного кабинета
  const handlePersonalAccountClick = () => {
    closeMenu(); // Закрываем бургер-меню
    navigate(routes.personalAccount); // Переходим на страницу личного кабинета
  };

  // ФУНКЦИЯ ДЛЯ ВЫХОДА ИЗ АККАУНТА
  const handleLogoutClick = () => {
    closeMenu(); // Закрываем бургер-меню
    // Диспатчим экшен для сброса статуса авторизации в Redux
    dispatch(setAuthenticated(false));
    // Перенаправляем пользователя на главную страницу после выхода
    navigate(routes.home);
    console.log('Пользователь вышел.');
  };

  // Функция для переключения состояния бургер-меню (открыть/закрыть)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Функция для закрытия бургер-меню
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Обработчик клика по иконке поиска (или ссылке ПОИСК в бургере)
  const handleSearchClick = () => {
    closeMenu(); // Закрываем бургер-меню
    const targetPath = routes.home; // Целевая страница для поиска - всегда главная
    const targetHash = '#search-section'; // ID секции поиска на главной

    // Проверяем, находимся ли мы уже на целевой странице (главной)
    if (location.pathname === targetPath) {
      // Если да, пытаемся найти секцию поиска и прокрутить к ней
      const searchSection = document.getElementById('search-section');
      if (searchSection) {
        // Используем setTimeout для плавной прокрутки и последующей фокусировки
        setTimeout(() => {
          searchSection.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            // Фокусируем поле ввода поиска с помощью переданного рефа
            searchInputRef.current?.focus();
          }, 300); // Небольшая задержка после скролла
        }, 0); // Таймаут 0 позволяет браузеру сначала обработать скролл
      }
    } else {
      // Если нет, переходим на главную страницу с хэшем #search-section
      navigate(`${targetPath}${targetHash}`);
    }
  };

  // Обработчик клика по ссылке "DISCOVER"
  const handleDiscoverClick = (event: React.MouseEvent<HTMLSpanElement>) => { // Тип события для span
    event.preventDefault(); // Отключаем стандартное поведение ссылки
    closeMenu(); // Закрываем бургер-меню

    // Выбираем случайную статью из списка и переходим на ее страницу
    if (articlesList && articlesList.length > 0) {
      const randomIndex = Math.floor(Math.random() * articlesList.length);
      const randomArticle = articlesList[randomIndex];
      // Генерируем путь к странице статьи, используя ее ID
      const articlePath = generatePath(routes.article, { id: randomArticle.id });
      navigate(articlePath); // Переходим на страницу статьи
    } else {
      console.warn('Список статей пуст'); // Сообщение, если статей нет
    }
  };

  // Эффект для закрытия бургер-меню при клике вне его или при нажатии Escape
  useEffect(() => {
    // Обработчик клика по документу
    const handleClickOutside = (event: MouseEvent) => {
      // Если меню открыто, и клик был вне меню и не по иконке бургера
      if (
        isMenuOpen && // Меню открыто
        menuRef.current && !menuRef.current.contains(event.target as Node) && // Клик вне элемента меню
        burgerRef.current && !burgerRef.current.contains(event.target as Node) // Клик вне иконки бургера
      ) {
        closeMenu(); // Закрываем меню
      }
    };

    // Обработчик нажатия клавиши
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) { // Если нажата Escape и меню открыто
        closeMenu(); // Закрываем меню
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
  }, [isMenuOpen]); // Зависимость эффекта от состояния isMenuOpen

  // Рендеринг компонента хедера
  return (
    <>
      <header className={styles.header}> {/* Основной контейнер хедера */}
        {/* Логотип (кликабелен, ведет на главную) */}
        <span className={styles.logo} onClick={handleLogoClick}> AUCTION.COM </span>
        {/* Центральная навигация (скрывается на мобильных), не показывается на странице информации */}
        {!isInformationPage && (
          <div className={styles.centerNav}>
            {/* Ссылки с плавным скроллом к секциям на главной/информационной странице */}
            <HashLink smooth to={routes.access} className={styles.link} onClick={closeMenu}> PREFERED ACCESS </HashLink>
            <HashLink smooth to={routes.about} className={styles.link} onClick={closeMenu}> ABOUT </HashLink>
            {/* Ссылка "DISCOVER" (кликабельна, ведет на случайную статью) */}
            <span className={styles.link} onClick={handleDiscoverClick}> DISCOVER </span>
            <HashLink smooth to={routes.services} className={styles.link} onClick={closeMenu}> SERVICES </HashLink>
            <HashLink smooth to={routes.instructions} className={styles.link} onClick={closeMenu}> КАК КУПИТЬ ИЛИ ПРОДАТЬ </HashLink>
          </div>
        )}
        {/* Контейнер действий справа (Авторизация, Поиск, Избранное, Бургер) */}
        <div className={styles.actions}>
          {/* !!! УСЛОВНЫЙ РЕНДЕРИНГ: Кнопка АВТОРИЗАЦИЯ или ЛИЧНЫЙ КАБИНЕТ (для широких экранов) !!! */}
          {isAuthenticated ? (
            // Если авторизован - кнопка Личный кабинет
            <div onClick={handlePersonalAccountClick} className={styles.login}>
              ЛИЧНЫЙ КАБИНЕТ
              <img src={AuthIcon} alt="Личный кабинет" className={styles.icon} />
            </div>
          ) : (
            // Если не авторизован - кнопка Авторизация
            <div onClick={handleLoginClick} className={styles.login}>
              АВТОРИЗАЦИЯ
              <img src={AuthIcon} alt="Вход" className={styles.icon} />
            </div>
          )}
          {/* КОНЕЦ УСЛОВНОГО РЕНДЕРИНГА */}

          {/* Иконка поиска (кликабельна, ведет на поиск на главной) */}
          {/* Иконка поиска скрывается на мобильных согласно стилям .actions > .icon */}
          <div onClick={handleSearchClick} className={styles.icon}> <img className={styles.icon} alt="Поиск" src={SearchIcon} /> </div>
          {/* Ссылка на страницу избранного */}
          <NavLink to={routes.favorite} onClick={closeMenu}> <img className={styles.favIcon} alt="Избранное" src={StarIcon} /> </NavLink>
          {/* Иконка бургера (видима только на мобильных) */}
          <img src={BurgerIcon} alt="Меню" className={styles.burger} onClick={toggleMenu} ref={burgerRef} />
        </div>
      </header>

      {/* БУРГЕР-МЕНЮ (скрыто по умолчанию, показывается при active) */}
      <div className={`${styles.burgerMenu} ${isMenuOpen ? styles.active : ''}`} ref={menuRef}> {/* Контейнер меню с рефом */}
        <div className={styles.burgerMenuContent}> {/* Контейнер содержимого меню */}
          {/* Ссылки бургер-меню (аналоги центральной навигации + дополнительные) */}
          <HashLink smooth to={routes.access} className={styles.burgerMenuLink} onClick={closeMenu}> PREFERED ACCESS </HashLink>
          <HashLink smooth to={routes.about} className={styles.burgerMenuLink} onClick={closeMenu}> ABOUT </HashLink>
          <span className={styles.burgerMenuLink} onClick={handleDiscoverClick}> DISCOVER </span>
          <HashLink smooth to={routes.services} className={styles.burgerMenuLink} onClick={closeMenu}> SERVICES </HashLink>
          <HashLink smooth to={routes.instructions} className={styles.burgerMenuLink} onClick={closeMenu}> КАК КУПИТЬ ИЛИ ПРОДАТЬ </HashLink>

          {/* Ссылки на секции футера (предполагается, что это якоря на странице Information) */}
          <HashLink smooth to={`${routes.information}${routes.ANCHOR_FOOTER_LINKS_SUPPORT}`} className={styles.burgerMenuLink} onClick={closeMenu}> ПОДДЕРЖКА </HashLink>
          <HashLink smooth to={`${routes.information}${routes.ANCHOR_FOOTER_LINKS_CORPORATE}`} className={styles.burgerMenuLink} onClick={closeMenu}> СОТРУДНИЧЕСТВО </HashLink>

          {isAuthenticated ? (
            // Если авторизован - ссылка Личный кабинет и кнопка Выйти
            <>
              <NavLink to={routes.personalAccount} className={styles.burgerMenuLink} onClick={closeMenu}>
                ЛИЧНЫЙ КАБИНЕТ
              </NavLink>
              {/* Кнопка Выйти - используем span с стилями ссылки */}
              <span className={styles.burgerMenuLink} onClick={handleLogoutClick}>
                 ВЫЙТИ
              </span>
            </>
          ) : (
            // Если не авторизован - ссылка Авторизация
            <span className={styles.burgerMenuLink} onClick={handleLoginClick}>
                 АВТОРИЗАЦИЯ
             </span>
          )}

        </div>
      </div>
    </>
  );
};

export default Header;