// src/components/LotGrid.tsx
import React, { useState, useEffect, useMemo } from 'react';
import * as styles from './LotGrid.module.css';
import { generatePath, NavLink } from 'react-router';
import { routes } from '../routes';
import FavoriteLotIcon from '../icons/favoriteLot.svg'; // Иконка для "в избранном"
import AddFavoriteLotIcon from '../icons/addFavoriteLot.svg'; // Иконка для "добавить в избранное"
import MagnifierIcon from '../icons/magnifier.svg'; // Иконка увеличительного стекла
import BackPageAIcon from '../icons/backpageA.svg';
import BackPageDIcon from '../icons/backpageD.svg';
import NextPageAIcon from '../icons/nextpageA.svg';
import NextPageDIcon from '../icons/nextpageD.svg';
import DollarIcon from '../icons/dollar.svg';
// Удален import lotsData from '../lotsList'; // Больше не импортируем напрямую здесь
import { useZoomPhotoModal } from '../contexts/ZoomPhotoModalContext';

// ИМПОРТЫ ДЛЯ REDUX
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { addFavorite, removeFavorite } from '../store/slices/favoritesSlice';


// Определяем тип лота (если есть в другом файле, импортируйте)
interface Lot {
  id: number;
  number: string | number;
  title: string;
  price: string;
  city: string | undefined;
  event: string | undefined;
  category: string | undefined;
  image: string;
  // ... другие поля
}

function getWindowWidth() {
  return window.innerWidth;
}

const getPaginationItems = (currentPage: number, totalPages: number): (number | string)[] => {
  const T = totalPages;
  const C = currentPage;
  const items: (number | string)[] = [];
  if (T <= 1) { return [1]; }
  const visiblePages = new Set<number>();
  visiblePages.add(1);
  if (C > 1 && C < T) { visiblePages.add(C); }
  if (T > 1) visiblePages.add(T);
  const sortedVisiblePages = Array.from(visiblePages).sort((a, b) => a - b);
  if (sortedVisiblePages.length > 0) {
    items.push(sortedVisiblePages[0]);
    for (let i = 1; i < sortedVisiblePages.length; i++) {
      const prev = sortedVisiblePages[i - 1];
      const current = sortedVisiblePages[i];
      if (current - prev > 1) { items.push('...'); }
      items.push(current);
    }
  }
  return items;
};


const LotGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth] = React.useState(getWindowWidth());
  const lotsPerPage = windowWidth >= 600 ? 9 : 4;

  const allLots = useSelector((state: RootState) => state.filterSort.allLots) as Lot[];
  const selectedLocations = useSelector((state: RootState) => state.filterSort.selectedLocations);
  const selectedEvents = useSelector((state: RootState) => state.filterSort.selectedEvents);
  const selectedCategories = useSelector((state: RootState) => state.filterSort.selectedCategories);
  const selectedSort = useSelector((state: RootState) => state.filterSort.selectedSort);
  const searchTerm = useSelector((state: RootState) => state.filterSort.searchTerm);

  const filteredAndSortedLots = useMemo(() => {
    let filteredLots = allLots;
    if (selectedLocations.length > 0) {
      const lowerSelectedLocations = selectedLocations.map(loc => loc.toLowerCase());
      filteredLots = filteredLots.filter(lot => lot.city !== undefined && lowerSelectedLocations.includes(lot.city.toLowerCase()));
    }
    if (selectedEvents.length > 0) {
      const lowerSelectedEvents = selectedEvents.map(event => event.toLowerCase());
      filteredLots = filteredLots.filter(lot => lot.event !== undefined && lowerSelectedEvents.includes(lot.event.toLowerCase()));
    }
    if (selectedCategories.length > 0) {
      const lowerSelectedCategories = selectedCategories.map(cat => cat.toLowerCase());
      filteredLots = filteredLots.filter(lot => lot.category !== undefined && lowerSelectedCategories.includes(lot.category.toLowerCase()));
    }
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filteredLots = filteredLots.filter(lot =>
        (lot.title && lot.title.toLowerCase().includes(lowerCaseSearchTerm)) ||
        (lot.number !== undefined && lot.number.toString().toLowerCase().includes(lowerCaseSearchTerm))
      );
    }
    const sortedLots = [...filteredLots];
    switch (selectedSort) {
      case 'title-asc': sortedLots.sort((a, b) => (a.title || '').localeCompare(b.title || '')); break;
      case 'title-desc': sortedLots.sort((a, b) => (b.title || '').localeCompare(a.title || '')); break;
      case 'city-asc': sortedLots.sort((a, b) => (a.city || '').localeCompare(b.city || '')); break;
      case 'city-desc': sortedLots.sort((a, b) => (b.city || '').localeCompare(a.city || '')); break;
      case 'price-asc': sortedLots.sort((a, b) => { const priceA = parseFloat(a.price); const priceB = parseFloat(b.price); if (isNaN(priceA) && isNaN(priceB)) return 0; if (isNaN(priceA)) return 1; if (isNaN(priceB)) return -1; return priceA - priceB; }); break;
      case 'price-desc': sortedLots.sort((a, b) => { const priceA = parseFloat(a.price); const priceB = parseFloat(b.price); if (isNaN(priceA) && isNaN(priceB)) return 0; if (isNaN(priceA)) return -1; if (isNaN(priceB)) return 1; return priceB - priceA; }); break;
      default: sortedLots.sort((a, b) => a.id - b.id); break;
    }
    return sortedLots;
  }, [allLots, selectedLocations, selectedEvents, selectedCategories, selectedSort, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedSort]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedLocations, selectedEvents, selectedCategories, searchTerm]);

  const hasActiveFilters = selectedLocations.length > 0 || selectedEvents.length > 0 || selectedCategories.length > 0;
  const hasActiveSearch = searchTerm !== '';

  const totalPages = filteredAndSortedLots.length === 0 ? 1 : Math.ceil(filteredAndSortedLots.length / lotsPerPage);
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (currentPage === 0 && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * lotsPerPage;
  const currentLots = filteredAndSortedLots.slice(startIndex, startIndex + lotsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const { open } = useZoomPhotoModal();
  const openImagePopup = (imageUrl: string) => {
    open(imageUrl);
  };

  const dispatch = useDispatch<AppDispatch>();
  const favoriteLotIds = useSelector((state: RootState) => state.favorites.items);


  // Генерируем элементы пагинации для отображения
  const paginationItems = totalPages > 1 ? getPaginationItems(currentPage, totalPages) : [];


  return (
    <div>
      {filteredAndSortedLots.length === 0 && (
        <div className={styles.noResults}>
          {allLots.length === 0 ? (
            'Данные о лотах отсутствуют.'
          ) : hasActiveSearch ? (
            `Поиск по запросу "${searchTerm}" не дал результатов.`
          ) : hasActiveFilters ? (
            `Нет лотов, соответствующих выбранным фильтрам.`
          ) : (
            'Нет лотов для отображения.'
          )}
        </div>
      )}

      {currentLots.length > 0 && (
        <div className={styles.grid}>
          {currentLots.map((lot) => {
            const isFavorite = favoriteLotIds.includes(lot.id);

            const handleToggleFavorite = (event: React.MouseEvent) => {
              event.preventDefault();
              event.stopPropagation(); // Останавливаем всплытие клика
              if (isFavorite) {
                dispatch(removeFavorite(lot.id));
              } else {
                dispatch(addFavorite(lot.id));
              }
            };

            return (
              <div key={lot.id} className={styles.card}>
                {/* Единый контейнер изображения с обработчиком клика для попапа */}
                <div
                  className={styles.imageWrapper}
                  onClick={() => openImagePopup(lot.image)} // Клик по обертке вызывает попап
                >
                  <img src={lot.image} alt={lot.title} className={styles.image} />

                  <img
                    src={isFavorite ? FavoriteLotIcon : AddFavoriteLotIcon} // Выбираем иконку
                    alt={isFavorite ? 'В избранном' : 'Добавить в избранное'} // Alt-текст
                    className={`${styles.favoriteIcon} ${isFavorite? styles.active : ''}`}
                    onClick={handleToggleFavorite}
                  />
                  {/* !!! КОНЕЦ ИКОНКИ ИЗБРАННОГО !!! */}

                  {/* ИКОНКА УВЕЛИЧИТЕЛЬНОГО СТЕКЛА: Управление видимостью через CSS !!! */}
                  <img
                    src={MagnifierIcon}
                    alt="Увеличить"
                    className={styles.magnifier} // Используем существующий класс .magnifier
                    // Для управления видимостью при наведении потребуется CSS правило на .imageWrapper:hover
                  />
                  {/* !!! КОНЕЦ ИКОНКИ УВЕЛИЧИТЕЛЬНОГО СТЕКЛА !!! */}

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


      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button className={`${styles.pageBtn} ${currentPage === 1 ? styles.disabled : ''}`} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            <img src={currentPage === 1 ? BackPageAIcon : BackPageDIcon} alt="Назад" />
            Назад
          </button>
          {paginationItems.map((item, index) => {
            const key = typeof item === 'number' ? item : `ellipsis-${index}`;
            if (item === '...') { return (<span key={key} className={styles.ellipsis}>...</span>); }
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
          <button className={`${styles.pageBtn} ${currentPage === totalPages ? styles.disabled : ''}`} onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Вперед
            <img src={currentPage === totalPages ? NextPageAIcon : NextPageDIcon} alt="Вперед" />
          </button>
        </div>
      )}
    </div>
  );
};

export default LotGrid;