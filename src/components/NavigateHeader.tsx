import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import * as styles from './NavigateHeader.module.css';
import NavigateIcon from '../icons/navigationIcon.svg';

const NavigateHeader = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className={styles.breadcrumbs}>
      <Link to="/" className={styles.breadcrumbLink}>
        Главная
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const displayName = getDisplayName(name);

        return isLast ? (
          <React.Fragment key={name}>
            <span className={styles.currentBreadcrumb}>
              <img className={styles.icon} src={NavigateIcon} alt=""/>
              {displayName}
            </span>
          </React.Fragment>
        ) : (
          <React.Fragment key={name}>
            <Link to={routeTo} className={styles.breadcrumbLink}>
              {displayName}
            </Link>
          </React.Fragment>
        );
      })}
    </div>
  );
};

const getDisplayName = (path: string) => {
  const names: Record<string, string> = {
    'favorite': 'Избранное',
    'cart': 'Корзина',
    'lots': 'Лоты',
    'profile': 'Профиль',
  };

  return names[path] || path.charAt(0).toUpperCase() + path.slice(1);
};

export default NavigateHeader;