// src/components/PersonalData.tsx
import React from 'react';
// !!! ИМПОРТИРУЕМ СТИЛИ ИЗ НОВОГО МОДУЛЯ !!!
import * as styles from './PersonalData.module.css';

const PersonalData: React.FC = () => {
  return (
    // !!! ИСПОЛЬЗУЕМ КЛАСС ИЗ НОВОГО МОДУЛЯ !!!
    <div className={styles.personalData}>
      <h2>Персональные данные</h2>
      <p>Имя: admin</p>
      <p>Имя: admin</p>
      <p>Телефон: +7(777)777-77-77</p>
      {/* Добавьте поля формы для редактирования */}
    </div>
  );
};

export default PersonalData;