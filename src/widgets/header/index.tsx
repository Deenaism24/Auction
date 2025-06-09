// src/widgets/header/index.tsx
import React, { useState, useEffect, useRef } from 'react';
import { HashLink } from 'react-router-hash-link';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import AuthIcon from '../../icons/enter.svg';
import SearchIcon from '../../icons/search.svg';
import StarIcon from '../../icons/star.svg';
import BurgerIcon from '../../icons/burger.svg';
import * as styles from './Header.module.css';
import { useAuthModal } from '../../contexts/AuthFlowModalContext';
import { routes } from '../../routes';

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

  // !!! ИЗМЕНЕННЫЙ БЛОК HANDLESEARCHCLICK !!!
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
            searchInputRef.current?.focus();
          }, 300); // Небольшая задержка
        }, 0); // Запускаем в следующем цикле событий
      }
    } else {
      // Если мы НЕ на главной, сначала навигируем на главную
      // Важно: navigate не блокирует выполнение, прокрутка должна произойти ПОСЛЕ навигации.
      // Мы можем использовать state или useEffect в компоненте главной страницы для прокрутки после загрузки,
      // но самый простой способ - навигация с хешем, на которую HashLink реагирует,
      // и убедиться, что на главной странице есть соответствующий элемент и Search принимает реф.

      // Используем navigate с хешем. React Router и HashLink должны справиться с прокруткой.
      // Мы все равно можем добавить логику фокуса на главной странице, если нужно.
      navigate(`${targetPath}${targetHash}`);

      // ВАЖНО: Фокусировка не сработает МГНОВЕННО здесь, т.к. страница переключается.
      // Фокус должен быть установлен на главной странице после того, как она загрузится и прокрутится.
      // Это можно сделать в useEffect на главной странице, реагируя на изменение location.hash.
    }
  };
  // !!! КОНЕЦ ИЗМЕНЕННОГО БЛОКА !!!


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
        <span
          className={styles.logo}
          onClick={handleLogoClick}
        >
          AUCTION.COM
        </span>
        {!isInformationPage && (
          <div className={styles.centerNav}>
            <HashLink smooth to={routes.access} className={styles.link} onClick={closeMenu}>
              PREFERED ACCESS
            </HashLink>
            <HashLink smooth to={routes.about} className={styles.link} onClick={closeMenu}>
              ABOUT
            </HashLink>
            <NavLink to={routes.article} className={styles.link} onClick={closeMenu}>
              DISCOVER
            </NavLink>
            <HashLink smooth to={routes.services} className={styles.link} onClick={closeMenu}>
              SERVICES
            </HashLink>
            <HashLink smooth to={routes.instructions} className={styles.link} onClick={closeMenu}>
              КАК КУПИТЬ ИЛИ ПРОДАТЬ
            </HashLink>
          </div>
        )}
        <div className={styles.actions}>
          <div onClick={handleLoginClick} className={styles.login}>
            АВТОРИЗАЦИЯ
            <img src={AuthIcon} alt="Вход" className={styles.icon} />
          </div>
          {/* Используем div для вызова обработчика */}
          <div onClick={handleSearchClick} className={styles.searchAction}>
            <img className={styles.icon} alt="Поиск" src={SearchIcon} />
          </div>

          <NavLink to={routes.favorite} onClick={closeMenu}>
            <img className={styles.favIcon} alt="Избранное" src={StarIcon} />
          </NavLink>
          <img
            src={BurgerIcon}
            alt="Меню"
            className={styles.burger}
            onClick={toggleMenu}
            ref={burgerRef}
          />
        </div>
      </header>

      {/* Бургер-меню */}
      <div className={`${styles.burgerMenu} ${isMenuOpen ? styles.active : ''}`} ref={menuRef}>
        <div className={styles.burgerMenuContent}>
          <HashLink smooth to={routes.access} className={styles.burgerMenuLink} onClick={closeMenu}>
            PREFERED ACCESS
          </HashLink>
          <HashLink smooth to={routes.about} className={styles.burgerMenuLink} onClick={closeMenu}>
            ABOUT
          </HashLink>
          <NavLink to={routes.article} className={styles.burgerMenuLink} onClick={closeMenu}>
            DISCOVER
          </NavLink>
          <HashLink smooth to={routes.services} className={styles.burgerMenuLink} onClick={closeMenu}>
            SERVICES
          </HashLink>
          <HashLink smooth to={routes.instructions} className={styles.burgerMenuLink} onClick={closeMenu}>
            КАК КУПИТЬ ИЛИ ПРОДАТЬ
          </HashLink>

          <HashLink
            smooth
            to={routes.ROUTE_TO_FOOTER_LINKS_SUPPORT}
            className={styles.burgerMenuLink}
            onClick={closeMenu}
          >
            ПОДДЕРЖКА
          </HashLink>

          <HashLink
            smooth
            to={routes.ROUTE_TO_FOOTER_LINKS_CORPORATE}
            className={styles.burgerMenuLink}
            onClick={closeMenu}
          >
            СОТРУДНИЧЕСТВО
          </HashLink>

          {window.innerWidth <= 650 && (
            <>
              <span className={styles.burgerMenuLink} onClick={handleLoginClick}>
                АВТОРИЗАЦИЯ
              </span>
              {/* Используем div в бургер-меню тоже */}
              <div className={styles.burgerMenuLink} onClick={handleSearchClick}>
                ПОИСК
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;