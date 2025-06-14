// src/components/Lot.tsx
import React from 'react';
import * as styles from './Lot.module.css';
import DollarIcon from '../icons/dollar.svg';
import { Lot as LotType } from '../store/slices/filterSortSlice';


interface LotProps {
  lot: LotType | undefined;
}

const Lot: React.FC<LotProps> = ({ lot }) => {
  if (!lot) {
    return <div className={styles.notFound}>Лот не найден</div>;
  }

  const renderDetail = (label: string, value: string | number | undefined | null) => {
    const displayValue = (value !== undefined && value !== null && value !== '') ? value.toString() : 'не задано';
    return (
      <div className={styles.detailRow}>
        <span className={styles.detailLabel}>{label}:</span> {/* Метка */}
        <span className={styles.detailValue}>{displayValue}</span> {/* Значение */}
      </div>
    );
  };

  return (
    <div className={styles.lotContainer}>

      {/* Заголовок лота */}
      <div className={styles.lotHeader}>
        <div className={styles.h2}>{lot.title || 'Название не задано'}</div>
        <div className={styles.subHeader}>
          <div className={styles.lotNumber} >
            <span>НОМЕР ЛОТА:</span>
            <span style={{ marginLeft: 'auto' }}>{lot.number !== undefined && lot.number !== null ? lot.number.toString() : 'не задано'}</span>
          </div>
        </div>
      </div>

      {/* Изображение лота */}
      {lot.image ? (
        <img src={lot.image} alt={lot.title || 'Изображение лота'} className={styles.lotImage} />
      ) : (
        <div className={styles.noImage}>Изображение отсутствует</div>
      )}

      {/* Информация о лоте */}
      <div className={styles.lotDetails}>

        <div className={styles.priceRow} >
          <img src={DollarIcon} alt="Цена" className={styles.dollarIcon} />
          <div className={styles.priceLabel}>СТАРТОВАЯ ЦЕНА:</div>
          {/* !!! ЗНАЧЕНИЕ ЦЕНЫ */}
          <div className={styles.priceValue} >{lot.price || 'не задано'}</div>
        </div>


        {/* Детали: Город, Событие, Категория (используем renderDetail) */}
        {renderDetail('ГОРОД', lot.city)}
        {renderDetail('СОБЫТИЕ', lot.event)}
        {renderDetail('КАТЕГОРИЯ', lot.category)}

      </div>

    </div>
  );
};

export default Lot;