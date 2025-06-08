// src/components/LotGrid.tsx
import React, { useState, useEffect, useMemo } from 'react';
import * as styles from './LotGrid.module.css';
import { generatePath, NavLink } from 'react-router';
import { routes } from '../routes';
import MagnifierIcon from '../icons/magnifier.svg';
import BackPageAIcon from '../icons/backpageA.svg';
import BackPageDIcon from '../icons/backpageD.svg';
import NextPageAIcon from '../icons/nextpageA.svg';
import NextPageDIcon from '../icons/nextpageD.svg';
import DollarIcon from '../icons/dollar.svg';
import lotsData from '../lotsList'; // Используем другое имя, чтобы не конфликтовать с filteredLots
import { useZoomPhotoModal } from '../contexts/ZoomPhotoModalContext';

// ИМПОРТЫ ДЛЯ REDUX
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { addFavorite, removeFavorite } from '../store/slices/favoritesSlice';
// !!! УДАЛЯЕМ ИМПОРТЫ НЕСУЩЕСТВУЮЩИХ СЕЛЕКТОРОВ !!!
// import { selectSelectedLocations, selectSelectedEvents, selectSelectedCategories, selectSelectedSort, selectSearchTerm } from '../store/slices/filterSortSlice';
// !!! КОНЕЦ УДАЛЕНИЯ ИМПОРТОВ !!!


// Предположим, у вас есть иконки для избранного
// import FavoriteIconEmpty from '../icons/favorite-empty.svg';
// import FavoriteIconFilled from '../icons/favorite-filled.svg';


function getWindowWidth() {
  return window.innerWidth;
}

// ФУНКЦИЯ ДЛЯ ГЕНЕРАЦИИ ЭЛЕМЕНТОВ ПАГИНАЦИИ (оставляем как есть)
const getPaginationItems = (currentPage: number, totalPages: number): (number | string)[] => {
  const T = totalPages;
  const C = currentPage;
  const items: (number | string)[] = [];

  if (T <= 1) {
    return [1];
  }

  const visiblePages = new Set<number>();
  visiblePages.add(1);
  if (C > 1 && C < T) {
    visiblePages.add(C);
  }
  if (T > 1) visiblePages.add(T); // Добавляем последнюю страницу, если она > 1


  const sortedVisiblePages = Array.from(visiblePages).sort((a, b) => a - b);

  if (sortedVisiblePages.length > 0) {
    items.push(sortedVisiblePages[0]);

    for (let i = 1; i < sortedVisiblePages.length; i++) {
      const prev = sortedVisiblePages[i - 1];
      const current = sortedVisiblePages[i];

      if (current - prev > 1) {
        items.push('...');
      }
      items.push(current);
    }
  }

  return items;
};


const LotGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth] = React.useState(getWindowWidth());
  const lotsPerPage = windowWidth >= 600 ? 9 : 4;

  // !!! ЧТЕНИЕ СОСТОЯНИЯ ФИЛЬТРОВ/СОРТИРОВКИ ИЗ REDUX (прямой доступ к state) !!!
  const selectedLocations = useSelector((state: RootState) => state.filterSort.selectedLocations);
  const selectedEvents = useSelector((state: RootState) => state.filterSort.selectedEvents);
  const selectedCategories = useSelector((state: RootState) => state.filterSort.selectedCategories);
  const selectedSort = useSelector((state: RootState) => state.filterSort.selectedSort);
  const searchTerm = useSelector((state: RootState) => state.filterSort.searchTerm);
  // !!! КОНЕЦ ЧТЕНИЯ СОСТОЯНИЯ !!!


  // !!! ЛОГИКА ФИЛЬТРАЦИИ И СОРТИРОВКИ !!!
  const filteredAndSortedLots = useMemo(() => {
    let filteredLots = lotsData; // Начинаем с полного списка

    // 1. Применяем фильтры по категориям, событиям, локациям
    if (selectedLocations.length > 0) {
      // !!! ИСПРАВЛЕНИЕ: Проверка на undefined перед includes !!!
      filteredLots = filteredLots.filter(lot => lot.city !== undefined && selectedLocations.includes(lot.city));
    }
    if (selectedEvents.length > 0) {
      // !!! ИСПРАВЛЕНИЕ: Проверка на undefined перед includes !!!
      filteredLots = filteredLots.filter(lot => lot.event !== undefined && selectedEvents.includes(lot.event));
    }
    if (selectedCategories.length > 0) {
      // !!! ИСПРАВЛЕНИЕ: Проверка на undefined перед includes !!!
      filteredLots = filteredLots.filter(lot => lot.category !== undefined && selectedCategories.includes(lot.category));
    }

    // 2. Применяем фильтр по поисковому запросу
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filteredLots = filteredLots.filter(lot =>
        (lot.title && lot.title.toLowerCase().includes(lowerCaseSearchTerm)) || // Поиск по названию (с проверкой на existence)
        (lot.number && lot.number.toString().includes(lowerCaseSearchTerm)) // Поиск по номеру (с проверкой на existence)
      );
    }


    // 3. Применяем сортировку
    const sortedLots = [...filteredLots]; // Создаем копию для сортировки
    switch (selectedSort) {
      case 'title-asc':
        sortedLots.sort((a, b) => (a.title || '').localeCompare(b.title || '')); // Сортировка строк, обрабатывая null/undefined
        break;
      case 'title-desc':
        sortedLots.sort((a, b) => (b.title || '').localeCompare(a.title || '')); // Сортировка строк, обрабатывая null/undefined
        break;
      case 'city-asc':
        sortedLots.sort((a, b) => (a.city || '').localeCompare(b.city || '')); // Сортировка строк, обрабатывая null/undefined
        break;
      case 'city-desc':
        sortedLots.sort((a, b) => (b.city || '').localeCompare(a.city || '')); // Сортировка строк, обрабатывая null/undefined
        break;
      case 'price-asc':
        // Убедимся, что price можно безопасно преобразовать
        sortedLots.sort((a, b) => {
          const priceA = parseFloat(a.price);
          const priceB = parseFloat(b.price);
          // Считаем NaN больше любого числа для консистентности при сортировке
          if (isNaN(priceA) && isNaN(priceB)) return 0;
          if (isNaN(priceA)) return 1;
          if (isNaN(priceB)) return -1;
          return priceA - priceB;
        });
        break;
      case 'price-desc':
        sortedLots.sort((a, b) => {
          const priceA = parseFloat(a.price);
          const priceB = parseFloat(b.price);
          // Считаем NaN меньше любого числа для консистентности при сортировке
          if (isNaN(priceA) && isNaN(priceB)) return 0;
          if (isNaN(priceA)) return -1;
          if (isNaN(priceB)) return 1;
          return priceB - priceA;
        });
        break;
      default:
        // Сортировка по умолчанию (например, по id)
        sortedLots.sort((a, b) => a.id - b.id);
        break;
    }

    return sortedLots;

  }, [selectedLocations, selectedEvents, selectedCategories, selectedSort, searchTerm]); // Зависимости useMemo
  // !!! КОНЕЦ ЛОГИКИ ФИЛЬТРАЦИИ И СОРТИРОВКИ !!!


  // !!! ЭФФЕКТ ДЛЯ СБРОСА СТРАНИЦЫ ПРИ ИЗМЕНЕНИИ ФИЛЬТРОВ/СОРТИРОВКИ/ПОИСКА !!!
  // Этот эффект должен запускаться, когда изменяются зависимости фильтрации/сортировки/поиска
  useEffect(() => {
    setCurrentPage(1); // Сбрасываем на первую страницу
    // Опционально: прокрутить страницу вверх при сбросе фильтров
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedLocations, selectedEvents, selectedCategories, selectedSort, searchTerm]);
  // !!! КОНЕЦ ЭФФЕКТА !!!

  // !!! РАСЧЕТ HASFILTERS ЛОКАЛЬНО !!!
  const hasActiveFilters = selectedLocations.length > 0 || selectedEvents.length > 0 || selectedCategories.length > 0;
  const hasActiveSearch = searchTerm !== '';
  // !!! КОНЕЦ РАСЧЕТА HASFILTERS ЛОКАЛЬНО !!!


  // Общее количество страниц теперь зависит от filteredAndSortedLots
  const totalPages = filteredAndSortedLots.length === 0 ? 1 : Math.ceil(filteredAndSortedLots.length / lotsPerPage);
  // Если текущая страница стала больше нового общего количества страниц (после фильтрации),
  // нужно скорректировать ее. Хотя useEffect выше уже сбрасывает на 1,
  // эта проверка может быть полезна в других сценариях или как дополнительная подстраховка.
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]); // Зависит от текущей страницы и общего количества страниц


  const startIndex = (currentPage - 1) * lotsPerPage;
  // Получаем лоты для текущей страницы ИЗ отфильтрованного и отсортированного списка
  const currentLots = filteredAndSortedLots.slice(startIndex, startIndex + lotsPerPage);


  const handlePageChange = (page: number) => {
    // Убеждаемся, что страница находится в допустимом диапазоне нового totalPages
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Опционально: прокрутить страницу вверх при смене страницы
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const { open } = useZoomPhotoModal();
  const openImagePopup = (imageUrl: string) => {
    open(imageUrl);
  };

  // !!! REDUX ХУКИ ДЛЯ ИЗБРАННОГО (оставляем их) !!!
  const dispatch = useDispatch<AppDispatch>();
  const favoriteLotIds = useSelector((state: RootState) => state.favorites.items);
  // !!! REDUX ХУКИ !!!


  // Генерируем элементы пагинации для отображения, основываясь на новом totalPages
  const paginationItems = totalPages > 1 ? getPaginationItems(currentPage, totalPages) : [];


  return (
    <div>
      {/* !!! Отображаем сообщение, если лоты не найдены после фильтрации/поиска !!! */}
      {filteredAndSortedLots.length === 0 && (
        <div className={styles.noResults}>
          {lotsData.length === 0 ? (
            'Данные о лотах отсутствуют.' // Если исходный список пуст
          ) : hasActiveSearch ? (
            `Поиск по запросу "${searchTerm}" не дал результатов.`
          ) : hasActiveFilters ? (
            `Нет лотов, соответствующих выбранным фильтрам.`
          ) : (
            'Нет лотов для отображения.' // Этот случай маловероятен, если lotsData не пуст
          )}
        </div>
      )}
      {/* !!! КОНЕЦ СООБЩЕНИЯ !!! */}

      {/* Рендерим сетку, только если есть лоты для текущей страницы */}
      {currentLots.length > 0 && (
        <div className={styles.grid}>
          {currentLots.map((lot) => {
            const isFavorite = favoriteLotIds.includes(lot.id);

            const handleToggleFavorite = (event: React.MouseEvent) => {
              event.preventDefault();
              if (isFavorite) {
                dispatch(removeFavorite(lot.id));
              } else {
                dispatch(addFavorite(lot.id));
              }
            };

            return (
              <div key={lot.id} className={styles.card}>
                <button
                  className={styles.favoriteButton}
                  onClick={handleToggleFavorite}
                  aria-label={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
                >
                  {isFavorite ? '❤️' : '🤍'}
                </button>

                <div className={styles.imageWrapper} onClick={() => openImagePopup(lot.image)}>
                  <img src={lot.image} alt={lot.title} className={styles.image} />
                  <img src={MagnifierIcon} alt="Посмотреть" className={styles.magnifier} />
                </div>
                <NavLink
                  to={generatePath(routes.openLot, { lot: lot.number })}
                  className={styles.info}
                >
                  <div className={styles.info}>
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
            );
          })}
        </div>
      )}


      {/* Рендерим пагинацию только если страниц больше одной */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          {/* Кнопка "Назад" */}
          <button
            className={`${styles.pageBtn} ${currentPage === 1 ? styles.disabled : ''}`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <img src={currentPage === 1 ? BackPageAIcon : BackPageDIcon} alt="Назад" />
            Назад
          </button>

          {paginationItems.map((item, index) => {
            const key = typeof item === 'number' ? item : `ellipsis-${index}`;

            if (item === '...') {
              return (
                <span key={key} className={styles.ellipsis}>
                    ...
                  </span>
              );
            }

            const pageNumber = item as number;
            return (
              <button
                key={key}
                className={`${styles.pageNum} ${currentPage === pageNumber ? styles.active : ''}`}
                onClick={() => handlePageChange(pageNumber)}
                disabled={currentPage === pageNumber}
              >
                {pageNumber}
              </button>
            );
          })}

          {/* Кнопка "Вперед" */}
          <button
            className={`${styles.pageBtn} ${currentPage === totalPages ? styles.disabled : ''}`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Вперед
            <img src={currentPage === totalPages ? NextPageAIcon : NextPageDIcon} alt="Вперед" />
          </button>
        </div>
      )}
    </div>
  );
};

export default LotGrid;