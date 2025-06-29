// src/components/PersonalData.tsx
import React from 'react';
import * as styles from './ProfileData.module.css';

const PersonalData: React.FC = () => {
  return (
    <section className={styles.dataSection}>
      <div className={styles.dataHeader}>
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