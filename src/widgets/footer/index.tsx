import React from 'react';
import './Footer.css';
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
      <footer className="footer">
        {/* Support Column */}
        <div className="column">
          <h3 className="columnTitle">SUPPORT</h3>
          <NavLink to={routes.help} className="link">
            HELP CENTER
          </NavLink>
          <NavLink to={routes.locations} className="link">
            LOCATIONS
          </NavLink>
          <NavLink to={routes.app} className="link">
            DOWNLOAD THE APP
          </NavLink>
        </div>

        {/* Corporate Column */}
        <div className="column">
          <h3 className="columnTitle">CORPORATE</h3>
          <NavLink to={routes.press} className="link">
            PRESS
          </NavLink>
          <NavLink to={routes.privacy} className="link">
            PRIVACY POLICY
          </NavLink>
          <NavLink to={routes.governance} className="link">
            CORPORATE GOVERNANCE
          </NavLink>
          <NavLink to={routes.careers} className="link">
            CAREERS
          </NavLink>
        </div>

        {/* More Column */}
        <div className="column">
          <h3 className="columnTitle">MORE...</h3>
          <NavLink to={routes.security} className="link">
            SECURITY
          </NavLink>
          <NavLink to={routes.terms} className="link">
            TERMS & CONDITIONS
          </NavLink>
          <NavLink to={routes.business} className="link">
            CONDITIONS OF BUSINESS
          </NavLink>
          <NavLink to={routes.slavary} className="link">
            MODERN SLAVERY STATEMENT
          </NavLink>
        </div>

        {/* Login Button */}
        <div onClick={handleLoginClick} className='auth'>
          <div className='login'>LOG IN
            <img src={AuthIcon} alt="Вход" className='icon' />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
