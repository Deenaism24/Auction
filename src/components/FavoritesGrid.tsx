// src/components/FavoritesGrid.tsx
import React from 'react';
import * as styles from './LotGrid.module.css'; // Можно переиспользовать стили или создать новые
import { generatePath, NavLink } from 'react-router';
import { routes } from '../routes';
import DollarIcon from '../icons/dollar.svg';
import lotsData from '../lotsList'; // Импортируем полный список лотов
// !!! ИМПОРТЫ ДЛЯ REDUX !!!
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { removeFavorite } from '../store/slices/favoritesSlice';
// !!! ИМПОРТЫ ДЛЯ REDUX !!!

const FavoritesGrid: React.FC = () => {
  // !!! REDUX ХУКИ !!!
  const dispatch = useDispatch<AppDispatch>();
  // Получаем только массив ID избранных лотов из состояния Redux
  const favoriteLotIds = useSelector((state: RootState) => state.favorites.items);
  // !!! REDUX ХУКИ !!!

  // Фильтруем полный список лотов, оставляя только те, чьи ID есть в избранном
  const favoriteLots = lotsData.filter(lot => favoriteLotIds.includes(lot.id));

  // Функция для удаления лота из избранного
  const handleRemoveFavorite = (lotId: number) => {
    dispatch(removeFavorite(lotId)); // Диспатчим экшен удаления
  };

  return (
    <div>
      <h1>Избранные лоты</h1>
      {/* Можно использовать те же стили сетки или создать уникальные */}
      <div className={styles.grid}>
        {favoriteLots.length === 0 ? (
          <p>Список избранного пуст.</p>
        ) : (
          favoriteLots.map((lot) => (
            // Можно переиспользовать структуру карточки из LotGrid или упростить
            <div key={lot.id} className={styles.card}>
              {/* !!! КНОПКА УДАЛЕНИЯ ИЗ ИЗБРАННОГО !!! */}
              {/* Добавьте стили для этой кнопки */}
              <button
                className={styles.removeFavoriteButton} // Добавьте этот класс в CSS
                onClick={() => handleRemoveFavorite(lot.id)}
                aria-label="Удалить из избранного"
              >
                ❌ {/* Пример: Крестик Unicode */}
              </button>
              {/* !!! КНОПКА УДАЛЕНИЯ ИЗ ИЗБРАННОГО !!! */}

              {/* Упрощенное отображение лота в избранном */}
              {/* Можете добавить изображение и другие детали, как в LotGrid */}
              <NavLink
                to={generatePath(routes.openLot, { lot: lot.number })}
                className={styles.info}
              >
                <div className={styles.info}>
                  {/* Если есть изображение, добавьте его */}
                  {/* <img src={lot.image} alt={lot.title} className={styles.image} /> */}
                  <div className={styles.numberRow}>
                    НОМЕР ЛОТА:
                    <span className={styles.numberValue}>{lot.number}</span>
                  </div>
                  <div className={styles.lotName}>
                    {lot.title}
                  </div>
                  <div>
                    <div className={styles.priceLabel}>
                      <img src={DollarIcon} alt="Цена" />
                      СТАРТОВАЯ ЦЕНА
                    </div>
                    <div className={styles.priceValue}>{lot.price}</div>
                  </div>
                </div>
              </NavLink>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FavoritesGrid;