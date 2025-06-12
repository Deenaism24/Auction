// src/widgets/header/index.tsx
import React, { useState, useEffect, useRef } from 'react';
import { HashLink } from 'react-router-hash-link';
import { NavLink, useLocation, useNavigate, generatePath } from 'react-router-dom';
import AuthIcon from '../../icons/enter.svg';
import SearchIcon from '../../icons/search.svg';
import StarIcon from '../../icons/star.svg';
import BurgerIcon from '../../icons/burger.svg';
import * as styles from './Header.module.css';
import { useAuthModal } from '../../contexts/AuthFlowModalContext';
import { routes } from '../../routes';
import articlesList from '../../articlesList';
// !!! ИМПОРТ ДЛЯ ЧТЕНИЯ СОСТОЯНИЯ ПОЛЬЗОВАТЕЛЯ ИЗ REDUX !!!
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
// !!! КОНЕЦ ИМПОРТА !!!


interface HeaderProps {
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  onLoginClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ searchInputRef }) => {
  const { open } = useAuthModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLImageElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // !!! ЧТЕНИЕ СОСТОЯНИЯ АВТОРИЗАЦИИ ИЗ REDUX !!!
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  // !!! КОНЕЦ ЧТЕНИЯ СОСТОЯНИЯ АВТОРИЗАЦИИ !!!


  const isInformationPage = location.pathname === routes.information;


  const handleLogoClick = () => {
    if (location.pathname === routes.home) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(routes.home);
    }
    closeMenu();
  };

  const handleLoginClick = () => {
    setIsMenuOpen(false);
    open('login'); // Открываем модалку авторизации/регистрации
  };

  // Функция для перехода в личный кабинет
  const handlePersonalAccountClick = () => {
    closeMenu();
    navigate(routes.personalAccount);
  };


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSearchClick = () => {
    closeMenu();
    const targetPath = routes.home;
    const targetHash = '#search-section';
    if (location.pathname === targetPath) {
      const searchSection = document.getElementById('search-section');
      if (searchSection) {
        setTimeout(() => {
          searchSection.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            searchInputRef.current?.focus();
          }, 300);
        }, 0);
      }
    } else {
      navigate(`${targetPath}${targetHash}`);
    }
  };

  const handleDiscoverClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    closeMenu();

    if (articlesList && articlesList.length > 0) {
      const randomIndex = Math.floor(Math.random() * articlesList.length);
      const randomArticle = articlesList[randomIndex];
      const articlePath = generatePath(routes.article, { id: randomArticle.id });
      navigate(articlePath);
    } else {
      console.warn('Список статей пуст');
    }
  };


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
            {/* Ссылка "DISCOVER" */}
            <span className={styles.link} onClick={handleDiscoverClick}> DISCOVER </span>
            <HashLink smooth to={routes.services} className={styles.link} onClick={closeMenu}> SERVICES </HashLink>
            <HashLink smooth to={routes.instructions} className={styles.link} onClick={closeMenu}> КАК КУПИТЬ ИЛИ ПРОДАТЬ </HashLink>
          </div>
        )}
        <div className={styles.actions}>
          {/* !!! УСЛОВНЫЙ РЕНДЕРИНГ: Авторизация ИЛИ Личный кабинет !!! */}
          {isAuthenticated ? (
            // Если авторизован - кнопка Личный кабинет
            <div onClick={handlePersonalAccountClick} className={styles.login}> {/* Можно использовать тот же стиль login или создать personalAccount */}
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
          {/* !!! КОНЕЦ УСЛОВНОГО РЕНДЕРИНГА !!! */}

          {/* Иконка поиска в ОСНОВНОМ хедере */}
          <div onClick={handleSearchClick} className={styles.icon}> <img className={styles.icon} alt="Поиск" src={SearchIcon} /> </div>
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
          {/* Ссылка "DISCOVER" в бургере */}
          <NavLink to={routes.article} className={styles.burgerMenuLink} onClick={handleDiscoverClick}> DISCOVER </NavLink>
          <HashLink smooth to={routes.services} className={styles.burgerMenuLink} onClick={closeMenu}> SERVICES </HashLink>
          <HashLink smooth to={routes.instructions} className={styles.burgerMenuLink} onClick={closeMenu}> КАК КУПИТЬ ИЛИ ПРОДАТЬ </HashLink>
          <HashLink smooth to={routes.ROUTE_TO_FOOTER_LINKS_SUPPORT} className={styles.burgerMenuLink} onClick={closeMenu}> ПОДДЕРЖКА </HashLink>
          <HashLink smooth to={routes.ROUTE_TO_FOOTER_LINKS_CORPORATE} className={styles.burgerMenuLink} onClick={closeMenu}> СОТРУДНИЧЕСТВО </HashLink>

          {window.innerWidth <= 650 && (
            <>
              {/* !!! УСЛОВНЫЙ РЕНДЕРИНГ В БУРГЕР-МЕНЮ !!! */}
              {isAuthenticated ? (
                // Если авторизован - ссылка Личный кабинет
                <NavLink to={routes.personalAccount} className={styles.burgerMenuLink} onClick={closeMenu}>
                  ЛИЧНЫЙ КАБИНЕТ
                </NavLink>
              ) : (
                // Если не авторизован - ссылка Авторизация
                <span className={styles.burgerMenuLink} onClick={handleLoginClick}>
                     АВТОРИЗАЦИЯ
                 </span>
              )}
              {/* !!! КОНЕЦ УСЛОВНОГО РЕНДЕРИНГА В БУРГЕР-МЕНЮ !!! */}

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