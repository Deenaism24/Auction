// src/components/PurchaseHistory.tsx
import React from 'react';
// Используем стили из PurchaseHistory.module.css
import * as styles from './ProfileData.module.css';
import DollarIcon from '../icons/dollar.svg';
// CalendarIcon не используется в этом компоненте, удалим импорт
// import CalendarIcon from '../icons/calendar.svg';
import { generatePath, NavLink } from 'react-router-dom';
import { routes } from '../routes';
import boughtLots from '../boughtLots'; // Предполагаем, что это ваш список купленных лотов

// Определяем тип купленного лота (может отличаться от типа Lot, если есть purchaseDate)
interface PurchasedLot {
  id: number;
  number: string | number;
  title: string;
  price: string;
  image?: string; // Изображение опционально
  purchaseDate: string; // Дата покупки
  // ... другие поля, если есть
}

// Предполагаем, что boughtLots содержит массив PurchasedLot
const purchasedLotsData: PurchasedLot[] = boughtLots as PurchasedLot[];


const PurchaseHistory: React.FC = () => {
  return (
    // Использует .historySection и .historyHeader, .h1, .h2 из своего CSS
    <section className={styles.historySection}>
      <div className={styles.historyHeader}>
        <div className={styles.h1}> Личный кабинет </div>
        <div className={styles.h2}>История покупок</div>
      </div>
      {purchasedLotsData.length === 0 ? (
        <p>У вас пока нет купленных лотов.</p>
      ) : (
        <ul className={styles.lotList}>
          {purchasedLotsData.map(lot => (
            <li key={lot.id} className={styles.lotListItem}>
              <NavLink
                to={generatePath(routes.openLot, { lot: lot.number })}
                className={styles.lotLinkContent}
              >
                {/* Изображение лота - используем те же классы, что в LotGrid,
                    и убедимся, что стили для них в PurchaseHistory.module.css
                    соответствуют размерам из LotGrid.module.css */}
                {lot.image && (
                  <div className={styles.imageWrapper}> {/* Используем .imageWrapper */}
                    <img src={lot.image} alt={lot.title} className={styles.image} /> {/* Используем .image */}
                  </div>
                )}

                {/* Информация о лоте */}
                <div className={styles.lotInfo}>
                  {/* Дата покупки - используем стили, адаптированные в PurchaseHistory.module.css */}
                  <div className={styles.auctionDateRow}> {/* Используем .auctionDateRow */}
                    {/* Если нужна иконка календаря, импортируйте CalendarIcon и добавьте <img src={CalendarIcon} ... /> */}
                    ДАТА ПОКУПКИ:
                    <span className={styles.dateRange}> {/* Используем .dateRange */}
                      {lot.purchaseDate}
                    </span>
                  </div>
                  {/* Название лота - используем тот же класс, что в LotGrid */}
                  <div className={styles.lotName}>{lot.title}</div> {/* Используем .lotName */}
                  {/* Стоимость - используем те же классы, что в LotGrid, адаптированные */}
                  <div>
                    <div className={styles.priceLabel}>
                      <img src={DollarIcon} alt="Цена" />
                      СТОИМОСТЬ:
                      <div className={styles.priceValue}>{lot.price}</div>
                    </div>
                  </div>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default PurchaseHistory;