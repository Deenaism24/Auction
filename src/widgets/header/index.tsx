import React, { useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import AuthIcon from '../../icons/enter.svg';
import SearchIcon from '../../icons/search.svg';
import StarIcon from '../../icons/star.svg';
import BagIcon from '../../icons/bag.svg';
import BurgerIcon from '../../icons/burger.svg';
import './Header.css';
import { NavLink } from 'react-router';
import { routes } from '../../routes';

interface HeaderProps {
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  onLoginClick?: () => void;  // Добавляем опциональный пропс
}

const Header: React.FC<HeaderProps> = ({ searchInputRef, onLoginClick = () => {} }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchClick = () => {
    setIsMenuOpen(false);

    const searchSection = document.getElementById('search-section');
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth' });

      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 500);
    }
  };

  return (
    <>
      <header className='header'>
        <NavLink to={routes.home} className='logo'> AUCTION.COM </NavLink>
        <div className='centerNav'>
          <NavLink to={routes.access} className='link'>
            PREFERED ACCESS
          </NavLink>
          <NavLink to={routes.about} className='link'>
            ABOUT
          </NavLink>
          <NavLink to={routes.catalog} className='link'>
            DISCOVER
          </NavLink>
          <NavLink to={routes.services} className='link'>
            SERVICES
          </NavLink>
          <NavLink to={routes.instructions} className='link'>
            КАК КУПИТЬ ИЛИ ПРОДАТЬ
          </NavLink>
        </div>
        <div className='actions'>
          <span onClick={onLoginClick} className='auth'>
            <div className='login'>АВТОРИЗАЦИЯ
              <img src={AuthIcon} alt="Вход" className='icon' />
            </div>
          </span>
          <HashLink smooth to="#search-section" onClick={handleSearchClick}>
            <img className='icon' alt="Поиск" src={SearchIcon} />
          </HashLink>
          <NavLink to={routes.favorite}>
            <img className='icon' alt="Избранное" src={StarIcon} />
          </NavLink>
          <NavLink to={routes.bag}>
            <img className='bagIcon' alt="Корзина" src={BagIcon} />
          </NavLink>
          <img
            src={BurgerIcon}
            alt="Меню"
            className='burger'
            onClick={toggleMenu}
          />
          <div className={`burgerMenu ${isMenuOpen ? 'active' : ''}`}>
            <div className="burgerMenuContent">
              <NavLink to={routes.access} className='burgerMenuLink' onClick={toggleMenu}>
                PREFERED ACCESS
              </NavLink>
              <NavLink to={routes.about} className='burgerMenuLink' onClick={toggleMenu}>
                ABOUT
              </NavLink>
              <NavLink to={routes.catalog} className='burgerMenuLink' onClick={toggleMenu}>
                DISCOVER
              </NavLink>
              <NavLink to={routes.services} className='burgerMenuLink' onClick={toggleMenu}>
                SERVICES
              </NavLink>
              <NavLink to={routes.instructions} className='burgerMenuLink' onClick={toggleMenu}>
                КАК КУПИТЬ ИЛИ ПРОДАТЬ
              </NavLink>
              {window.innerWidth <= 650 && (
                <>
                  <span className='burgerMenuLink' onClick={onLoginClick}>
                    АВТОРИЗАЦИЯ
                  </span>
                  <HashLink smooth to="#search-section" className='burgerMenuLink' onClick={handleSearchClick}>
                    ПОИСК
                  </HashLink>
                  <NavLink to={routes.favorite} className='burgerMenuLink' onClick={toggleMenu}>
                    ИЗБРАННОЕ
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;