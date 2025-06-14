// src/components/FavoritesGrid.tsx
import React from 'react';
import * as styles from './LotGrid.module.css';
import LotGrid from './LotGrid';

const FavoritesGrid = () => {
  return (
    <section className={styles.lotSection}>
      <div className={styles.gridHeader}>
        <div className={styles.h2}>Избранное</div>
      </div>
      <LotGrid isFavoritePage={true} />
    </section>
  );
};

export default FavoritesGrid;