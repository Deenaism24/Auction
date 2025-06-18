// src/components/Lot.tsx
import React, { useEffect } from 'react';
import * as styles from './Lot.module.css';
import DollarIcon from '../icons/dollar.svg';
import { Lot as LotType } from '../store/slices/filterSortSlice'; // Импорт типа лота из Redux slice

// Определение пропсов компонента: ожидает объект лота или undefined
interface LotProps {
  lot: LotType | undefined;
}

// Функциональный компонент для отображения детальной информации об одном лоте
const Lot: React.FC<LotProps> = ({ lot }) => {
  useEffect(() => {
    // Прокручиваем окно на самый верх
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [lot?.id]);

  // Если объект лота не передан, отображаем сообщение "Лот не найден"
  if (!lot) {
    return <div className={styles.notFound}>Лот не найден</div>;
  }

  // Вспомогательная функция для рендеринга одной строки детали (Метка: Значение)
  const renderDetail = (label: string, value: string | number | undefined | null) => {
    // Определяем отображаемое значение: если значение существует, конвертируем в строку, иначе "не задано"
    const displayValue = (value !== undefined && value !== null && value !== '') ? value.toString() : 'не задано';
    return (
      <div className={styles.detailRow}> {/* Контейнер строки с flexbox для выравнивания */}
        <span className={styles.detailLabel}>{label}:</span> {/* Метка детали */}
        <span className={styles.detailValue}>{displayValue}</span> {/* Значение детали */}
      </div>
    );
  };

  // Основной JSX компонента, рендерится, если лот найден
  return (
    <div className={styles.lotContainer}> {/* Главный контейнер лота */}

      {/* Заголовочная часть лота (название и номер) */}
      <div className={styles.lotHeader}>
        {/* Название лота */}
        <div className={styles.h2}>{lot.title || 'Название не задано'}</div>
        {/* Подзаголовок с номером лота */}
        <div className={styles.subHeader}>
          {/* Строка с номером лота */}
          <div className={styles.lotNumber} > {/* Возможно, здесь стили для flex */}
            <span>НОМЕР ЛОТА:</span> {/* Метка номера */}
            {/* Значение номера лота с выравниванием вправо */}
            <span style={{ marginLeft: 'auto' }}>{lot.number !== undefined && lot.number !== null ? lot.number.toString() : 'не задано'}</span>
          </div>
        </div>
      </div>

      {/* Изображение лота */}
      {lot.image ? (
        // Если изображение есть, отображаем его
        <img src={lot.image} alt={lot.title || 'Изображение лота'} className={styles.lotImage} />
      ) : (
        // Если изображения нет, отображаем заглушку
        <div className={styles.noImage}>Изображение отсутствует</div>
      )}

      {/* Информация о лоте */}
      <div className={styles.lotDetails}>

        {/* Строка с информацией о стартовой цене */}
        <div className={styles.priceRow} > {/* Контейнер с flexbox */}
          <img src={DollarIcon} alt="Цена" className={styles.dollarIcon} />
          <div className={styles.priceLabel}>СТАРТОВАЯ ЦЕНА:</div>
          <div className={styles.priceValue} >{lot.price || 'не задано'}</div>
        </div>

        {/* Отображаем другие детали лота, используя вспомогательную функцию renderDetail */}
        {renderDetail('ГОРОД', lot.city)}
        {renderDetail('СОБЫТИЕ', lot.event)}
        {renderDetail('КАТЕГОРИЯ', lot.category)}

      </div>

    </div>
  );
};

export default Lot;