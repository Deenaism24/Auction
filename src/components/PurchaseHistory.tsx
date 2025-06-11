// src/components/PurchaseHistory.tsx
import React from 'react';
// Используем стили из PurchaseHistory.module.css
import * as styles from './PurchaseHistory.module.css';
import DollarIcon from '../icons/dollar.svg';
import { generatePath, NavLink } from 'react-router-dom';
import { routes } from '../routes';
import boughtLots from '../boughtLots';

const PurchaseHistory: React.FC = () => {
  const purchasedLotsData = boughtLots;

  return (
    <div className={styles.purchaseHistory}>
      <h2>История покупок</h2>
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
                {/* Изображение лота - используем те же классы, что в LotGrid */}
                {lot.image && (
                  <div className={styles.imageWrapper}> {/* Используем .imageWrapper из LotGrid */}
                    <img src={lot.image} alt={lot.title} className={styles.image} /> {/* Используем .image из LotGrid */}
                  </div>
                )}

                {/* Информация о лоте */}
                <div className={styles.lotInfo}>
                  {/* Дата покупки - стилизуем как дату аукциона */}
                  <div className={styles.auctionDateRow}> {/* Новый класс для строки даты покупки */}
                    {/* Возможно, добавить иконку календаря */}
                    {/* <img src={CalendarIcon} alt="" className={styles.icon} /> */}
                    ДАТА ПОКУПКИ:
                    <span className={styles.dateRange}> {/* Используем .dateRange из LotGrid/AuctionGrid */}
                      {lot.purchaseDate}
                          </span>
                  </div>
                  {/* Название лота - используем тот же класс, что в LotGrid */}
                  <div className={styles.lotName}>{lot.title}</div> {/* Используем .lotName из LotGrid */}
                  {/* Стоимость - используем те же классы, что в LotGrid */}
                  <div className={styles.priceLabelRow}> {/* Новый класс для строки стоимости */}
                    <img src={DollarIcon} alt="Цена" className={styles.dollarIcon} /> {/* Используем .dollarIcon из LotGrid */}
                    <div className={styles.priceLabel}>Стоимость:</div> {/* Используем .priceLabel из LotGrid */}
                    <div className={styles.priceValue}>{lot.price}</div> {/* Используем .priceValue из LotGrid */}
                  </div>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PurchaseHistory;