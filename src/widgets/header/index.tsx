import React, { useState, useEffect, useRef } from 'react';
import { HashLink } from 'react-router-hash-link';
import AuthIcon from '../../icons/enter.svg';
import SearchIcon from '../../icons/search.svg';
import StarIcon from '../../icons/star.svg';
import BagIcon from '../../icons/bag.svg';
import BurgerIcon from '../../icons/burger.svg';
import * as styles from './Header.module.css';
import { NavLink } from 'react-router';
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

  const handleSearchClick = () => {
    closeMenu();
    const searchSection = document.getElementById('search-section');
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 500);
    }
  };

  // Закрытие меню при клике вне его области
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

    // Закрытие меню при нажатии Escape
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
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        AUCTION.COM
      </span>
        <div className={styles.centerNav}>
          <NavLink to={routes.access} className={styles.link} onClick={closeMenu}>
            PREFERED ACCESS
          </NavLink>
          <NavLink to={routes.about} className={styles.link} onClick={closeMenu}>
            ABOUT
          </NavLink>
          <NavLink to={routes.catalog} className={styles.link} onClick={closeMenu}>
            DISCOVER
          </NavLink>
          <NavLink to={routes.services} className={styles.link} onClick={closeMenu}>
            SERVICES
          </NavLink>
          <NavLink to={routes.instructions} className={styles.link} onClick={closeMenu}>
            КАК КУПИТЬ ИЛИ ПРОДАТЬ
          </NavLink>
        </div>
        <div className={styles.actions}>
          <div onClick={handleLoginClick} className={styles.login}>
            АВТОРИЗАЦИЯ
            <img src={AuthIcon} alt="Вход" className={styles.icon} />
          </div>
          <HashLink smooth to="#search-section" onClick={handleSearchClick}>
            <img className={styles.icon} alt="Поиск" src={SearchIcon} />
          </HashLink>
          <NavLink to={routes.favorite} onClick={closeMenu}>
            <img className={styles.icon} alt="Избранное" src={StarIcon} />
          </NavLink>
          <NavLink to={routes.bag} onClick={closeMenu}>
            <img className={styles.bagIcon} alt="Корзина" src={BagIcon} />
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
          <NavLink to={routes.access} className={styles.burgerMenuLink} onClick={closeMenu}>
            PREFERED ACCESS
          </NavLink>
          <NavLink to={routes.about} className={styles.burgerMenuLink} onClick={closeMenu}>
            ABOUT
          </NavLink>
          <NavLink to={routes.catalog} className={styles.burgerMenuLink} onClick={closeMenu}>
            DISCOVER
          </NavLink>
          <NavLink to={routes.services} className={styles.burgerMenuLink} onClick={closeMenu}>
            SERVICES
          </NavLink>
          <NavLink to={routes.instructions} className={styles.burgerMenuLink} onClick={closeMenu}>
            КАК КУПИТЬ ИЛИ ПРОДАТЬ
          </NavLink>
          {window.innerWidth <= 650 && (
            <>
            <span className={styles.burgerMenuLink} onClick={handleLoginClick}>
              АВТОРИЗАЦИЯ
            </span>
              <HashLink smooth to="#search-section" className={styles.burgerMenuLink} onClick={handleSearchClick}>
                ПОИСК
              </HashLink>
              <NavLink to={routes.favorite} className={styles.burgerMenuLink} onClick={closeMenu}>
                ИЗБРАННОЕ
              </NavLink>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;