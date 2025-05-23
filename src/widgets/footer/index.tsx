import React from 'react';
import * as styles from './Footer.module.css';
import { NavLink } from 'react-router';
import { useAuthModal } from '../../contexts/AuthFlowModalContext';
import { routes } from '../../routes';

import AuthIcon from '../../icons/enter.svg';


const Footer: React.FC = () => {
  const { open } = useAuthModal();
  const handleLoginClick = () => {
    open('login');
  };
  return (
    <>
      <footer className={styles.footer}>
        {/* Support Column */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>SUPPORT</h3>
          <NavLink to={routes.help} className={styles.link}>
            HELP CENTER
          </NavLink>
          <NavLink to={routes.locations} className={styles.link}>
            LOCATIONS
          </NavLink>
          <NavLink to={routes.app} className={styles.link}>
            DOWNLOAD THE APP
          </NavLink>
        </div>

        {/* Corporate Column */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>CORPORATE</h3>
          <NavLink to={routes.press} className={styles.link}>
            PRESS
          </NavLink>
          <NavLink to={routes.privacy} className={styles.link}>
            PRIVACY POLICY
          </NavLink>
          <NavLink to={routes.governance} className={styles.link}>
            CORPORATE GOVERNANCE
          </NavLink>
          <NavLink to={routes.careers} className={styles.link}>
            CAREERS
          </NavLink>
        </div>

        {/* More Column */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>MORE...</h3>
          <NavLink to={routes.security} className={styles.link}>
            SECURITY
          </NavLink>
          <NavLink to={routes.terms} className={styles.link}>
            TERMS & CONDITIONS
          </NavLink>
          <NavLink to={routes.business} className={styles.link}>
            CONDITIONS OF BUSINESS
          </NavLink>
          <NavLink to={routes.slavary} className={styles.link}>
            MODERN SLAVERY STATEMENT
          </NavLink>
        </div>

        {/* Login Button */}
        <div onClick={handleLoginClick} className={styles.auth}>
          <div className={styles.login}>LOG IN</div>
          <img src={AuthIcon} alt="Вход" className={styles.icon} />
        </div>
      </footer>
    </>
  );
};

export default Footer;
