import React from 'react';
import * as styles from './Footer.module.css';
import { useAuthModal } from '../../contexts/AuthFlowModalContext';
import { routes } from '../../routes';
import { downloadEmptyPdf } from '../../utils/downloadPDF';
import { useConfirmationModal } from '../../contexts/ConfirmationModalContext';

import AuthIcon from '../../icons/enter.svg';

const Footer: React.FC = () => {
  const { open } = useAuthModal();
  const { openConfirmation } = useConfirmationModal();

  const handleLoginClick = () => {
    open('login');
  };

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
        {/* Support Column */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>SUPPORT</h3>
          {routes.footerLinks.support.map(link => (
            <div
              key={link.path} // Use link.path as key
              className={styles.link} // Apply link styles
              onClick={(e) => handleDownloadClick(link.text, e)} // !!! ИЗМЕНЕНИЕ: Pass event object
              style={{ cursor: 'pointer' }}
            >
              {link.text}
            </div>
          ))}
        </div>

        {/* Corporate Column */}
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

        {/* More Column */}
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
