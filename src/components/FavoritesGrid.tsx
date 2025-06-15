// src/components/FavoritesGrid.tsx
import React from 'react';
import * as styles from './LotGrid.module.css';
import LotGrid from './LotGrid';

// ADD: Interface for the prop
interface FavoritesGridProps {
  favoriteSearchTerm: string; // Expect the local search term
}

// Modify component signature to accept the prop
const FavoritesGrid: React.FC<FavoritesGridProps> = ({ favoriteSearchTerm }) => {
  return (
    <section className={styles.lotSection}>
      <div className={styles.gridHeader}>
        <div className={styles.h2}>Избранное</div>
      </div>
      {/* Pass the local search term to LotGrid */}
      <LotGrid isFavoritePage={true} favoriteSearchTerm={favoriteSearchTerm} />
    </section>
  );
};

export default FavoritesGrid;