// src/components/FavoritesGrid.tsx
import React from 'react';
import * as styles from './LotGrid.module.css';
import LotGrid from './LotGrid';

// Определение пропсов компонента: ожидает поисковый запрос, специфичный для избранного
interface FavoritesGridProps {
  favoriteSearchTerm: string; // Ожидаем поисковый запрос
}

// Компонент, который рендерит раздел "Избранное" с сеткой лотов
const FavoritesGrid: React.FC<FavoritesGridProps> = ({ favoriteSearchTerm }) => {
  return (
    // Секция для отображения избранного, использует те же стили секции, что и AuctionLotGrid
    <section className={styles.lotSection}>
      {/* Заголовок секции "Избранное" */}
      <div className={styles.gridHeader}>
        <div className={styles.h2}>Избранное</div>
      </div>
      {/* Встраиваем универсальный компонент LotGrid */}
      {/* isFavoritePage={true} указывает LotGrid, что он находится в режиме отображения избранного */}
      {/* favoriteSearchTerm передается для фильтрации внутри LotGrid */}
      <LotGrid isFavoritePage={true} favoriteSearchTerm={favoriteSearchTerm} />
    </section>
  );
};

export default FavoritesGrid;