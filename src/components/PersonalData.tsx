// src/components/PersonalData.tsx
import React from 'react';
import * as styles from './PersonalData.module.css';

const PersonalData: React.FC = () => {
  return (
    <section className={styles.historySection}>
      <div className={styles.historyHeader}>
        <div className={styles.h1}> Личный кабинет </div>
        <div className={styles.h2}> Персональные данные </div>
      </div>
      <p>Имя: admin</p>
      <p>Почта: admin@a.ru</p>
      <p>Телефон: +7(777)777-77-77</p>
      {/* Возможно, добавить другие поля пользователя */}
    </section>
  );
};

export default PersonalData;