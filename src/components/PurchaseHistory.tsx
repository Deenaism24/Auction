// src/components/PurchaseHistory.tsx
import React from 'react';
import * as styles from './ProfileData.module.css';
import DollarIcon from '../icons/dollar.svg';
import boughtLots from '../boughtLots'; // Импорт данных о купленных лотах

// Определяем тип купленного лота
interface PurchasedLot {
  id: number; // ID лота
  number: string | number; // Номер лота
  title: string; // Название лота
  price: string; // Цена покупки
  image?: string; // URL изображения (опционально)
  purchaseDate: string; // Дата покупки
  // ... другие поля, если есть
}

// Преобразуем импортированные данные к определенному типу
const purchasedLotsData: PurchasedLot[] = boughtLots as PurchasedLot[];


// Компонент для отображения истории покупок
const PurchaseHistory: React.FC = () => {
  return (
    // Секция с данными пользователя, используем стили ProfileData
    <section className={styles.dataSection}>
      {/* Заголовок секции */}
      <div className={styles.dataHeader}>
        <div className={styles.h1}> Личный кабинет </div> {/* Основной заголовок */}
        <div className={styles.h2}>История покупок</div> {/* Подзаголовок */}
      </div>
      {/* Условный рендеринг: если лотов нет или есть */}
      {purchasedLotsData.length === 0 ? (
        // Если нет купленных лотов, показываем сообщение
        <p>У вас пока нет купленных лотов.</p>
      ) : (
        // Если есть купленные лоты, отрисовываем список
        <ul className={styles.lotList}>
          {/* Проходим по каждому купленному лоту */}
          {purchasedLotsData.map(lot => (
            <li key={lot.id} className={styles.lotListItem}> {/* Элемент списка для каждого лота */}
              {/* Контейнер для изображения и информации о лоте */}
              <div className={styles.lotContent}>
                {/* Отображаем изображение, если оно есть */}
                {lot.image && (
                  <div className={styles.imageWrapper}>
                    <img src={lot.image} alt={lot.title} className={styles.image} />
                  </div>
                )}

                {/* Блок информации о лоте */}
                <div className={styles.lotInfo}>
                  {/* Строка с датой покупки */}
                  <div className={styles.auctionDateRow}>
                    ДАТА ПОКУПКИ:
                    <span className={styles.dateRange}>
                      {lot.purchaseDate} {/* Отображаем дату */}
                    </span>
                  </div>
                  {/* Название лота */}
                  <div className={styles.lotName}>{lot.title}</div>
                  {/* Строка с ценой покупки */}
                  <div>
                    <div className={styles.priceLabel}>
                      <div className={styles.priceLeft}>
                        <img src={DollarIcon} alt="Цена" /> {/* Иконка доллара */}
                        СТОИМОСТЬ:
                      </div>
                      <div className={styles.priceValue}>{lot.price}</div> {/* Отображаем цену */}
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