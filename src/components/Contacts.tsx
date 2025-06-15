import * as styles from './InformationAddition.module.css';
import PhoneIcon from '../icons/phone.svg';
import MailIcon from '../icons/mail.svg';
import React from 'react';

// Функциональный компонент для отображения контактной информации
const Contacts: React.FC = () => {
  return (
    // Основной контейнер для секции информации (используется в InformationAddition)
    <div className={styles.infoSection}>
      {/* Блок с контактной информацией, использует специфические стили */}
      <div className={styles.contactInfo}>
        {/* Заголовок блока контактов */}
        <div className={styles.contactHeader}>Контакты со специалистом</div>

        {/* Первый контактный элемент (основной телефон и почта) */}
        <div className={styles.contactItem}>
          {/* Строка с телефоном */}
          <div className={styles.contactLine}>
            <img src={PhoneIcon} alt="PHONE" className={styles.icon} />
            <span>+44 20 7318 4024</span>
          </div>
          {/* Строка с почтой */}
          <div className={styles.contactLine}>
            <img src={MailIcon} alt="MAIL" className={styles.contactIcon} />
            <a href="mailto:EditionsLondon@Phillips.com" className={styles.contactLink}>
              EditionsLondon@Phillips.com
            </a>
          </div>
        </div>

        {/* Второй контактный элемент (специфический контакт) */}
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

        {/* Третий контактный элемент (другой специфический контакт) */}
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