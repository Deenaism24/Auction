// src/components/FavoritesGrid.tsx
import React from 'react';
// Используем те же стили, предполагая, что структура заголовков и секций одинакова
import * as styles from './LotGrid.module.css';
// Импортируем универсальный компонент сетки
import LotGrid from './LotGrid';

const FavoritesGrid = () => {
  return (
    // Используем тот же класс секции для консистентности макета
    <section className={styles.lotSection}>
      <div className={styles.gridHeader}>
        <div className={styles.h2}>Избранное</div>
      </div>
      {/* Рендерим универсальный LotGrid, передавая ему проп для режима избранного */}
      <LotGrid isFavoritePage={true} />
    </section>
  );
};

export default FavoritesGrid;