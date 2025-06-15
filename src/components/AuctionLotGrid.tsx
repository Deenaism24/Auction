import React from 'react';
import * as styles from './LotGrid.module.css';
import CalendarIcon from '../icons/calendar.svg';
import LotGrid from './LotGrid';

// Компонент для отображения раздела "Аукцион картин автора" на главной странице
const AuctionLotGrid = () => {
  return (
    // Секция с лотами, использует общие стили LotGrid
    <section className={styles.lotSection}>
      {/* Заголовок секции */}
      <div className={styles.gridHeader}>
        {/* Основной заголовок "Аукцион картин автора" */}
        <div className={styles.h2}>Аукцион картин автора</div>
        {/* Подзаголовок с датой аукциона */}
        <div className={styles.subHeader}>
          {/* Метка даты аукциона с иконкой */}
          <div className={styles.auctionDate}>
            <img src={CalendarIcon} alt="Дата аукциона" /> {/* Иконка календаря */}
            ДАТА АУКЦИОНА {/* Текст метки */}
          </div>
          {/* Значение даты аукциона */}
          <div className={styles.dateRange}>10–13 ЯНВАРЯ</div>
        </div>
      </div>
      {/* Встраиваем основной компонент сетки лотов. Он будет управлять отображением лотов, пагинацией, сортировкой и фильтрацией. */}
      <LotGrid/>
    </section>
  );
};

export default AuctionLotGrid;