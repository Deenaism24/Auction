// src/components/FooterLinks.tsx
import React from 'react';
import * as styles from './FooterLinks.module.css'; // Use component's styles
import { routes } from '../routes';

import { downloadEmptyPdf } from '../utils/downloadPDF';

import { useConfirmationModal } from '../contexts/ConfirmationModalContext';


const FooterLinks: React.FC = () => {
  const { openConfirmation } = useConfirmationModal();

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

  const anchorMap: { [key: string]: string } = {
    support: routes.ANCHOR_FOOTER_LINKS_SUPPORT,
    corporate: routes.ANCHOR_FOOTER_LINKS_CORPORATE,
    more: routes.ANCHOR_FOOTER_LINKS_MORE,
  };

  return (
    <div className={styles.footerLinksContainer}> {/* Use component's container style */}

      <h1 className={styles.footerLinksTitle}>Дополнительная информация</h1> {/* Use component's title style */}

      {Object.entries(routes.footerLinks).map(([groupKey, links]) => (
        <div
          key={groupKey}
          id={anchorMap[groupKey]}
          className={styles.linkGroup}
        >
          <h2 className={styles.groupTitle}>{groupKey.toUpperCase()}</h2>
          <ul className={styles.linksList}>
            {links.map(link => (
              <li key={link.path} className={styles.linkItem}>
                <div
                  key={link.path}
                  className={styles.link}
                  onClick={(e) => handleDownloadClick(link.text, e)}
                  style={{ cursor: 'pointer' }}
                >
                  {link.text}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FooterLinks;