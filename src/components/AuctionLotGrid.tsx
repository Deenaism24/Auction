import React from 'react';
import * as styles from './LotGrid.module.css';
import CalendarIcon from '../icons/calendar.svg';
import LotGrid from './LotGrid';

const AuctionLotGrid = () => {
  return (
    <section className={styles.lotSection}>
      <div className={styles.gridHeader}>
        <div className={styles.h2}>Аукцион картин автора</div>
        <div className={styles.subHeader}>
          <div className={styles.auctionDate}>
            <img src={CalendarIcon} alt="Дата аукциона" />
            ДАТА АУКЦИОНА
          </div>
          <div className={styles.dateRange}>10–13 ЯНВАРЯ</div>
        </div>
      </div>
      <LotGrid/>
    </section>
  );
};

export default AuctionLotGrid;