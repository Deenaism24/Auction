import * as styles from './InformationAddition.module.css';
import PhoneIcon from '../icons/phone.svg';
import MailIcon from '../icons/mail.svg';
import React from 'react';

const Contacts: React.FC = () => {
  return (
  <div className={styles.infoSection}>
    <div className={styles.contactInfo}>
      <div className={styles.contactHeader}>Контакты со специалистом</div>

      <div className={styles.contactItem}>
        <div className={styles.contactLine}>
          <img src={PhoneIcon} alt="PHONE" className={styles.icon} />
          <span>+44 20 7318 4024</span>
        </div>
        <div className={styles.contactLine}>
          <img src={MailIcon} alt="MAIL" className={styles.contactIcon} />
          <a href="mailto:EditionsLondon@Phillips.com" className={styles.contactLink}>
            EditionsLondon@Phillips.com
          </a>
        </div>
      </div>

      <div className={styles.contactItem}>
        <div className={styles.contactName}>Rebecca Tooby</div>
        <div className={styles.contactTitle}>
          DesmondSpecialist, Head of Sale, EditionsTooby
        </div>
        <div className={styles.contactLine}>
          <img src={MailIcon} alt="MAIL" className={styles.contactIcon} />
          <a href="mailto:desmond@phillips.com" className={styles.contactLink}>
            desmond@phillips.com
          </a>
        </div>
      </div>

      <div className={styles.contactItem}>
        <div className={styles.contactName}>Robert Kennan</div>
        <div className={styles.contactTitle}>Head of Editions, Europe</div>
        <div className={styles.contactLine}>
          <img src={MailIcon} alt="MAIL" className={styles.contactIcon} />
          <a href="mailto:rkennan@phillips.com" className={styles.contactLink}>
            rkennan@phillips.com
          </a>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Contacts;

