// src/components/PurchaseHistory.tsx
import React from 'react';
import * as styles from './ProfileData.module.css';
import DollarIcon from '../icons/dollar.svg';
import boughtLots from '../boughtLots';

// Определяем тип купленного лота
interface PurchasedLot {
  id: number;
  number: string | number;
  title: string;
  price: string;
  image?: string; // Изображение опционально
  purchaseDate: string; // Дата покупки
  // ... другие поля, если есть
}

// boughtLots содержит массив PurchasedLot
const purchasedLotsData: PurchasedLot[] = boughtLots as PurchasedLot[];


const PurchaseHistory: React.FC = () => {
  return (
    <section className={styles.dataSection}>
      <div className={styles.dataHeader}>
        <div className={styles.h1}> Личный кабинет </div>
        <div className={styles.h2}>История покупок</div>
      </div>
      {purchasedLotsData.length === 0 ? (
        <p>У вас пока нет купленных лотов.</p>
      ) : (
        <ul className={styles.lotList}>
          {purchasedLotsData.map(lot => (
            <li key={lot.id} className={styles.lotListItem}>
              <div className={styles.lotContent}>
                {lot.image && (
                  <div className={styles.imageWrapper}>
                    <img src={lot.image} alt={lot.title} className={styles.image} />
                  </div>
                )}

                {/* Информация о лоте */}
                <div className={styles.lotInfo}>
                  <div className={styles.auctionDateRow}>
                    ДАТА ПОКУПКИ:
                    <span className={styles.dateRange}>
                      {lot.purchaseDate}
                    </span>
                  </div>
                  <div className={styles.lotName}>{lot.title}</div>
                  <div>
                    <div className={styles.priceLabel}>
                      <div className={styles.priceLeft}>
                      <img src={DollarIcon} alt="Цена" />
                      СТОИМОСТЬ:
                      </div>
                      <div className={styles.priceValue}>{lot.price}</div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default PurchaseHistory;