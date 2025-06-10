// src/widgets/header/index.tsx
import React, { useState, useEffect, useRef } from 'react';
import { HashLink } from 'react-router-hash-link';
// !!! ИМПОРТИРУЕМ NavLink, useLocation, useNavigate, generatePath !!!
import { NavLink, useLocation, useNavigate, generatePath } from 'react-router-dom';
import AuthIcon from '../../icons/enter.svg';
import SearchIcon from '../../icons/search.svg';
import StarIcon from '../../icons/star.svg';
import BurgerIcon from '../../icons/burger.svg';
import * as styles from './Header.module.css';
import { useAuthModal } from '../../contexts/AuthFlowModalContext';
import { routes } from '../../routes';
// !!! ИМПОРТИРУЕМ СПИСОК СТАТЕЙ !!!
import articlesList from '../../articlesList'; // Убедитесь, что путь правильный
// !!! КОНЕЦ ИМПОРТА !!!


interface HeaderProps {
  // searchInputRef все еще нужен для логики handleSearchClick
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  onLoginClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ searchInputRef }) => {
  const { open } = useAuthModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLImageElement>(null);
  const location = useLocation();
  const navigate = useNavigate(); // Убедитесь, что useNavigate импортирован

  // Находится ли текущая страница на маршруте информации
  const isInformationPage = location.pathname === routes.information;


  const handleLogoClick = () => {
    if (location.pathname === routes.home) {
      // Если уже на главной - скроллим наверх
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // переходим на главную
      navigate(routes.home);
    }
    closeMenu();
  };

  const handleLoginClick = () => {
    setIsMenuOpen(false);
    open('login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // !!! handleSearchClick - ОСТАВЛЯЕМ БЕЗ ИЗМЕНЕНИЙ, как вы просили !!!
  const handleSearchClick = () => {
    closeMenu(); // Закрываем меню

    const targetPath = routes.home; // Главная страница
    const targetHash = '#search-section'; // ID секции поиска

    // Если мы уже на главной странице, просто прокручиваем и фокусируем
    if (location.pathname === targetPath) {
      const searchSection = document.getElementById('search-section');
      if (searchSection) {
        // Используем setTimeout, чтобы дать браузеру время обновить DOM, если это необходимо
        setTimeout(() => {
          searchSection.scrollIntoView({ behavior: 'smooth' });
          // Дополнительный setTimeout для фокуса, чтобы гарантировать, что прокрутка завершилась
          setTimeout(() => {
            // searchInputRef может быть null, если компонент размонтирован или ref не был передан (хотя по типу он сейчас обязателен)
            searchInputRef.current?.focus();
          }, 300); // Небольшая задержка
        }, 0); // Запускаем в следующем цикле событий
      }
    } else {
      navigate(`${targetPath}${targetHash}`);
    }
  };
  // !!! КОНЕЦ handleSearchClick - БЕЗ ИЗМЕНЕНИЙ !!!


  // !!! НОВАЯ ЛОГИКА ДЛЯ КЛИКА НА "DISCOVER" (выбирает случайную статью) !!!
  const handleDiscoverClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); // Отменяем стандартное поведение NavLink
    closeMenu(); // Закрываем меню

    // Проверяем, что список статей не пуст
    if (articlesList && articlesList.length > 0) {
      // Выбираем случайный индекс
      const randomIndex = Math.floor(Math.random() * articlesList.length);
      // Получаем случайную статью
      const randomArticle = articlesList[randomIndex];
      // Навигируем на страницу этой статьи, используя ее ID
      // Важно: имя параметра в routes.ts должно совпадать ('id' в маршруте /article/:id?)
      const articlePath = generatePath(routes.article, { id: randomArticle.id });
      navigate(articlePath);
    } else {
      console.warn('Список статей пуст, невозможно выбрать случайную статью.');
      // Возможно, навигация на страницу каталога статей или просто ничего не делать
      // navigate(routes.article); // Например, на пустую страницу со списком
    }
  };
  // !!! КОНЕЦ НОВОЙ ЛОГИКИ ДЛЯ DISCOVER !!!


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        burgerRef.current &&
        !burgerRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);


  return (
    <>
      <header className={styles.header}>
        <span className={styles.logo} onClick={handleLogoClick}> AUCTION.COM </span>
        {!isInformationPage && (
          <div className={styles.centerNav}>
            <HashLink smooth to={routes.access} className={styles.link} onClick={closeMenu}> PREFERED ACCESS </HashLink>
            <HashLink smooth to={routes.about} className={styles.link} onClick={closeMenu}> ABOUT </HashLink>
            {/* !!! ПРИВЯЗЫВАЕМ handleDiscoverClick К NAVLINK !!! */}
            {/* У NavLink оставляем 'to' для семантики и правильного URL в статус-баре, но переопределяем onClick */}
            <NavLink to={routes.article} className={styles.link} onClick={handleDiscoverClick}> DISCOVER </NavLink>
            <HashLink smooth to={routes.services} className={styles.link} onClick={closeMenu}> SERVICES </HashLink>
            <HashLink smooth to={routes.instructions} className={styles.link} onClick={closeMenu}> КАК КУПИТЬ ИЛИ ПРОДАТЬ </HashLink>
          </div>
        )}
        <div className={styles.actions}>
          {/* Login */}
          <div onClick={handleLoginClick} className={styles.login}> АВТОРИЗАЦИЯ <img src={AuthIcon} alt="Вход" className={styles.icon} /> </div>
          {/* Иконка поиска в ОСНОВНОМ хедере */}
          <div onClick={handleSearchClick} className={styles.searchAction}> <img className={styles.icon} alt="Поиск" src={SearchIcon} /> </div>
          {/* Избранное */}
          <NavLink to={routes.favorite} onClick={closeMenu}> <img className={styles.favIcon} alt="Избранное" src={StarIcon} /> </NavLink>
          {/* Burger Icon */}
          <img src={BurgerIcon} alt="Меню" className={styles.burger} onClick={toggleMenu} ref={burgerRef} />
        </div>
      </header>

      {/* Бургер-меню */}
      <div className={`${styles.burgerMenu} ${isMenuOpen ? styles.active : ''}`} ref={menuRef}>
        <div className={styles.burgerMenuContent}>
          {/* ... другие ссылки ... */}
          <HashLink smooth to={routes.access} className={styles.burgerMenuLink} onClick={closeMenu}> PREFERED ACCESS </HashLink>
          <HashLink smooth to={routes.about} className={styles.burgerMenuLink} onClick={closeMenu}> ABOUT </HashLink>
          {/* !!! ПРИВЯЗЫВАЕМ handleDiscoverClick К NAVLINK В БУРГЕРЕ !!! */}
          <NavLink to={routes.article} className={styles.burgerMenuLink} onClick={handleDiscoverClick}> DISCOVER </NavLink>
          <HashLink smooth to={routes.services} className={styles.burgerMenuLink} onClick={closeMenu}> SERVICES </HashLink>
          <HashLink smooth to={routes.instructions} className={styles.burgerMenuLink} onClick={closeMenu}> КАК КУПИТЬ ИЛИ ПРОДАТЬ </HashLink>
          <HashLink smooth to={routes.ROUTE_TO_FOOTER_LINKS_SUPPORT} className={styles.burgerMenuLink} onClick={closeMenu}> ПОДДЕРЖКА </HashLink>
          <HashLink smooth to={routes.ROUTE_TO_FOOTER_LINKS_CORPORATE} className={styles.burgerMenuLink} onClick={closeMenu}> СОТРУДНИЧЕСТВО </HashLink>

          {window.innerWidth <= 650 && (
            <>
              <span className={styles.burgerMenuLink} onClick={handleLoginClick}> АВТОРИЗАЦИЯ </span>
              {/* Ссылка "ПОИСК" в бургер-меню */}
              <div className={styles.burgerMenuLink} onClick={handleSearchClick}> ПОИСК </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;