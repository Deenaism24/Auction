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

  // !!! ИЗМЕНЕННАЯ ФУНКЦИЯ renderDetail !!!
  const renderDetail = (label: string, value: string | number | undefined | null) => {
    const displayValue = (value !== undefined && value !== null && value !== '') ? value.toString() : 'не задано';
    return (
      <div className={styles.detailRow}> {/* Контейнер строки с display: flex */}
        <span className={styles.detailLabel}>{label}:</span> {/* Метка */}
        {/* !!! ЗНАЧЕНИЕ С margin-left: auto !!! */}
        <span className={styles.detailValue} style={{ marginLeft: 'auto' }}>{displayValue}</span> {/* Значение */}
      </div>
    );
  };
  // !!! КОНЕЦ ИЗМЕНЕННОЙ renderDetail !!!


  return (
    <div className={styles.lotContainer}>

      {/* Заголовок лота */}
      <div className={styles.lotHeader}>
        <div className={styles.h2}>{lot.title || 'Название не задано'}</div>
        {/* Номер лота в subHeader - можно оставить или перенести в детали */}
        {/* Если оставляете здесь, возможно, придется применить Flexbox здесь тоже */}
        <div className={styles.subHeader}>
          {/* Если хотите номер лота слева, а его значение справа: */}
          <div className={styles.lotNumber} style={{ display: 'flex', width: '100%' }}> {/* Flex-контейнер для номера в subHeader */}
            <span>НОМЕР ЛОТА:</span>
            <span style={{ marginLeft: 'auto' }}>{lot.number !== undefined && lot.number !== null ? lot.number.toString() : 'не задано'}</span>
          </div>
          {/* Можно добавить дату здесь в отдельном блоке или тоже с flex/auto margin */}
          {/* <div className={styles.lotDate} style={{ display: 'flex', width: '100%' }}>
                 <span>ДАТА:</span>
                 <span style={{ marginLeft: 'auto' }}>{lot.date || 'не задано'}</span>
             </div> */}
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

        {/* Стоимость лота - адаптируем Flexbox и auto margin */}
        {/* Используем .priceRow как Flex-контейнер */}
        <div className={styles.priceRow} style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <img src={DollarIcon} alt="Цена" className={styles.dollarIcon} />
          <div className={styles.priceLabel}>СТАРТОВАЯ ЦЕНА:</div>
          {/* !!! ЗНАЧЕНИЕ ЦЕНЫ С margin-left: auto !!! */}
          <div className={styles.priceValue} style={{ marginLeft: 'auto' }}>{lot.price || 'не задано'}</div>
        </div>


        {/* Детали: Город, Событие, Категория (используем renderDetail) */}
        {renderDetail('ГОРОД', lot.city)}
        {renderDetail('СОБЫТИЕ', lot.event)}
        {renderDetail('КАТЕГОРИЯ', lot.category)}

        {/* Добавьте другие детали лота */}
      </div>

    </div>
  );
};

export default Lot;