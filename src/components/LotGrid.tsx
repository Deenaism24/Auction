// src/components/LotGrid.tsx
import React, { useState, useEffect, useMemo } from 'react';
import * as styles from './LotGrid.module.css';
import { generatePath, NavLink } from 'react-router';
import { routes } from '../routes';
import FavoriteLotIcon from '../icons/favoriteLot.svg';
import AddFavoriteLotIcon from '../icons/addFavoriteLot.svg';
import MagnifierIcon from '../icons/magnifier.svg';
import BackPageAIcon from '../icons/backpageA.svg';
import BackPageDIcon from '../icons/backpageD.svg';
import NextPageAIcon from '../icons/nextpageA.svg';
import NextPageDIcon from '../icons/nextPageD.svg';
import DollarIcon from '../icons/dollar.svg';
import { useZoomPhotoModal } from '../contexts/ZoomPhotoModalContext';

// ИМПОРТЫ ДЛЯ REDUX
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { addFavorite, removeFavorite } from '../store/slices/favoritesSlice';
// Import Lot type from filterSortSlice for consistency
import { Lot } from '../store/slices/filterSortSlice';


function getWindowWidth() {
  return window.innerWidth;
}

// !!! ОБНОВЛЕННАЯ ЛОГИКА ГЕНЕРАЦИИ ЭЛЕМЕНТОВ ПАГИНАЦИИ !!!
const getPaginationItems = (currentPage: number, totalPages: number): (number | string)[] => {
  const T = totalPages; // Total pages
  const C = currentPage; // Current page

  const items = new Set<number>();

  if (T <= 1) {
    return [1];
  }
  items.add(1);
  if (C > 1 && C < T) {
    items.add(C);
  }
  items.add(T);

  // Convert Set to Array and sort numerically
  const sortedUniquePages = Array.from(items).sort((a, b) => a - b);

  const finalItems: (number | string)[] = [];

  if (sortedUniquePages.length > 0) {
    // Add the first page
    finalItems.push(sortedUniquePages[0]);

    // Iterate through the sorted pages and add ellipses where there are gaps > 1
    for (let i = 1; i < sortedUniquePages.length; i++) {
      const prev = sortedUniquePages[i - 1] as number; // Ensure type is number for arithmetic
      const current = sortedUniquePages[i] as number; // Ensure type is number for arithmetic

      if (current - prev > 1) {
        finalItems.push('...'); // Insert ellipsis
      }
      finalItems.push(current); // Add the current page number
    }
  }

  return finalItems;
};
// !!! КОНЕЦ ОБНОВЛЕННОЙ ЛОГИКИ !!!


// ПРОП ISFAVORITEPAGE - ADD favoriteSearchTerm prop
interface LotGridProps {
  isFavoritePage?: boolean;
  favoriteSearchTerm?: string; // ADD THIS PROP - used only when isFavoritePage is true
}

const LotGrid: React.FC<LotGridProps> = ({ isFavoritePage = false, favoriteSearchTerm = '' }) => {
  const [currentPage, setCurrentPage] = useState(1);
  // Consider adding a state/effect for window width if you need dynamic lotsPerPage
  // For now, keeping it simple with initial render width
  const [windowWidth] = React.useState(getWindowWidth()); // This won't update on resize
  const lotsPerPage = windowWidth >= 600 ? 9 : 4;


  // ЧТЕНИЕ ИЗ REDUX
  const allLots = useSelector((state: RootState) => state.filterSort.allLots) as Lot[];
  const favoriteLotIds = useSelector((state: RootState) => state.favorites.items); // ID избранных лотов

  // Read filters/global search only if NOT on favorite page
  const selectedLocations = !isFavoritePage ? useSelector((state: RootState) => state.filterSort.selectedLocations) : [];
  const selectedEvents = !isFavoritePage ? useSelector((state: RootState) => state.filterSort.selectedEvents) : [];
  const selectedCategories = !isFavoritePage ? useSelector((state: RootState) => state.filterSort.selectedCategories) : [];

  // Read global search term only if NOT on favorite page
  const globalSearchTerm = !isFavoritePage ? useSelector((state: RootState) => state.filterSort.searchTerm) : '';

  // Read global sort option (sorting applies to both pages' filtered lists)
  const selectedSort = useSelector((state: RootState) => state.filterSort.selectedSort);


  // Determine which search term to use based on the page
  const currentSearchTerm = isFavoritePage ? favoriteSearchTerm : globalSearchTerm;


  // ЛОГИКА ФИЛЬТРАЦИИ И СОРТИРОВКИ
  const filteredAndSortedLots = useMemo(() => {
    let workingLots = allLots; // Start with the full list

    // 1. Filter by favorites if on the favorite page
    if (isFavoritePage) {
      workingLots = workingLots.filter(lot => favoriteLotIds.includes(lot.id));
    }

    // 2. Apply filters (only on the main page)
    if (!isFavoritePage) {
      if (selectedLocations.length > 0) {
        const lowerSelectedLocations = selectedLocations.map(loc => loc.toLowerCase());
        workingLots = workingLots.filter(lot =>
          lot.city !== undefined && lot.city !== null && lowerSelectedLocations.includes(lot.city.toLowerCase())
        );
      }
      if (selectedEvents.length > 0) {
        const lowerSelectedEvents = selectedEvents.map(event => event.toLowerCase());
        workingLots = workingLots.filter(lot =>
          lot.event !== undefined && lot.event !== null && lowerSelectedEvents.includes(lot.event.toLowerCase())
        );
      }
      if (selectedCategories.length > 0) {
        const lowerSelectedCategories = selectedCategories.map(cat => cat.toLowerCase());
        workingLots = workingLots.filter(lot =>
          lot.category !== undefined && lot.category !== null && lowerSelectedCategories.includes(lot.category.toLowerCase())
        );
      }
    }

    // 3. Apply search filter using the determined search term
    if (currentSearchTerm) {
      const lowerCaseSearchTerm = currentSearchTerm.toLowerCase();
      workingLots = workingLots.filter(lot =>
        (lot.title && lot.title.toLowerCase().includes(lowerCaseSearchTerm)) ||
        (lot.number !== undefined && lot.number !== null && lot.number.toString().toLowerCase().includes(lowerCaseSearchTerm))
      );
    }

    // 4. Apply sorting (Sorting is global, uses Redux state)
    const sortedLots = [...workingLots];
    switch (selectedSort) {
      case 'title-asc': sortedLots.sort((a, b) => (a.title || '').localeCompare(b.title || '')); break;
      case 'title-desc': sortedLots.sort((a, b) => (b.title || '').localeCompare(a.title || '')); break;
      case 'city-asc': sortedLots.sort((a, b) => {
        const cityA = a.city || ''; // Treat undefined/null as empty string for sorting
        const cityB = b.city || '';
        return cityA.localeCompare(cityB);
      }); break;
      case 'city-desc': sortedLots.sort((a, b) => {
        const cityA = a.city || '';
        const cityB = b.city || '';
        return cityB.localeCompare(cityA);
      }); break;
      case 'price-asc': sortedLots.sort((a, b) => {
        const priceA = parseFloat((a.price || '0').replace(/,/g, '')); // Handle undefined/null price and remove commas
        const priceB = parseFloat((b.price || '0').replace(/,/g, ''));
        // Handle non-numeric prices by pushing them to the end (or start)
        if (isNaN(priceA) && isNaN(priceB)) return 0;
        if (isNaN(priceA)) return 1; // Push non-numeric priceA to end
        if (isNaN(priceB)) return -1; // Push non-numeric priceB to end
        return priceA - priceB;
      }); break;
      case 'price-desc': sortedLots.sort((a, b) => {
        const priceA = parseFloat((a.price || '0').replace(/,/g, ''));
        const priceB = parseFloat((b.price || '0').replace(/,/g, ''));
        if (isNaN(priceA) && isNaN(priceB)) return 0;
        if (isNaN(priceA)) return 1; // Push non-numeric priceA to end (still)
        if (isNaN(priceB)) return -1; // Push non-numeric priceB to end (still)
        return priceB - priceA;
      }); break;
      default: sortedLots.sort((a, b) => a.id - b.id); break; // Default sort by ID
    }

    return sortedLots;

  }, [
    allLots,
    favoriteLotIds, // Dependency for Favorite page filtering
    isFavoritePage, // Dependency for switching between filter modes
    selectedLocations, // Dependency for Home page filtering
    selectedEvents, // Dependency for Home page filtering
    selectedCategories, // Dependency for Home page filtering
    selectedSort, // Dependency for sorting (global)
    globalSearchTerm, // Dependency for Home page search (from Redux)
    favoriteSearchTerm // Dependency for Favorite page search (from prop)
  ]);

  // Effect to reset page and scroll to top when filter/sort/search changes
  useEffect(() => {
    // Reset page to 1 whenever the calculated filtered/sorted list potentially changes
    // This includes changes to filters, sort option, or either search term.
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [
    selectedLocations,
    selectedEvents,
    selectedCategories,
    selectedSort,
    globalSearchTerm,
    favoriteSearchTerm, // ADD THIS: Reset page when favorite search changes
    // favoriteLotIds is intentionally *not* here, as changing favorites shouldn't reset scroll/page on *main* page.
    // On favorite page, changing favorites WILL trigger re-render due to favoriteLotIds change,
    // and the dependency on favoriteSearchTerm (even if empty) will cause reset.
    // A separate effect *could* be added just for favorite page if needed, but current seems OK.
  ]);


  // Calculate total pages based on the current filtered/sorted list
  const totalPages = filteredAndSortedLots.length === 0 ? 1 : Math.ceil(filteredAndSortedLots.length / lotsPerPage);

  // Adjust current page if it's out of bounds after filtering/sorting
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (currentPage <= 0 && totalPages > 0) {
      setCurrentPage(1);
    } else if (totalPages === 0 && currentPage !== 1) {
      // If there are no lots matching criteria, ensure page is 1 (or 0 if that's preferred for 'no results')
      setCurrentPage(1); // Stay on page 1 even if no results
    }
  }, [currentPage, totalPages]);


  const startIndex = (currentPage - 1) * lotsPerPage;
  // Get lots for the current page slice
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
  // Handle toggling favorite status
  const handleToggleFavorite = (event: React.MouseEvent, lotId: number) => {
    event.preventDefault();
    event.stopPropagation();
    if (favoriteLotIds.includes(lotId)) {
      dispatch(removeFavorite(lotId));
      // If on the favorite page and removing, might want to re-evaluate the list immediately,
      // but the dependency array in useMemo already handles favoriteLotIds change.
    } else {
      // Allow adding from any page
      dispatch(addFavorite(lotId));
    }
  };

  // Generate pagination items
  const paginationItems = totalPages > 1 ? getPaginationItems(currentPage, totalPages) : [];

  // Determine the appropriate "no results" message
  const getNoResultsMessage = () => {
    if (allLots.length === 0) {
      return 'Данные о лотах отсутствуют.'; // If original list is empty
    }
    if (isFavoritePage && favoriteLotIds.length === 0 && !currentSearchTerm) {
      // Specific message for empty favorites list when no search is active
      return 'Список избранного пуст.';
    }
    if (currentSearchTerm) { // If there's an active search term (either global or favorite)
      return isFavoritePage ?
        `Среди избранного поиск по запросу "${currentSearchTerm}" не дал результатов.` :
        `Поиск по запросу "${currentSearchTerm}" не дал результатов.`;
    }
    // Check for active filters only on the main page
    if (!isFavoritePage && (selectedLocations.length > 0 || selectedEvents.length > 0 || selectedCategories.length > 0)) {
      return `Нет лотов, соответствующих выбранным фильтрам.`;
    }
    if (filteredAndSortedLots.length === 0) {
      // This covers cases like being on favorite page with favorites, but filters/search on favorites give no results
      return isFavoritePage ?
        'Нет лотов в избранном, соответствующих текущим критериям.' :
        'Нет лотов, соответствующих текущим критериям.';
    }
    return 'Нет лотов для отображения.'; // Catch-all (should be rare)
  };


  return (
    <div>
      {/* Display "no results" message if the filtered list is empty */}
      {filteredAndSortedLots.length === 0 && (
        <div className={styles.noResults}>
          {getNoResultsMessage()}
        </div>
      )}
      {/* Render the grid only if there are lots for the current page */}
      {currentLots.length > 0 && (
        <div className={styles.grid}>
          {currentLots.map((lot) => {
            const isFavorite = favoriteLotIds.includes(lot.id);
            const handleClickFavorite = (event: React.MouseEvent) => {
              handleToggleFavorite(event, lot.id);
            };

            return (
              <div key={lot.id} className={styles.card}>
                <div
                  className={styles.imageWrapper}
                  onClick={() => openImagePopup(lot.image)}
                >
                  <img src={lot.image} alt={lot.title} className={styles.image} />

                  {/* Favorite Icon Logic */}
                  <img
                    src={isFavorite ? FavoriteLotIcon : AddFavoriteLotIcon}
                    alt={isFavorite ? 'В избранном' : 'Добавить в избранное'}
                    className={`${styles.favoriteIcon} ${isFavorite ? styles.active : ''}`}
                    onClick={handleClickFavorite}
                  />

                  <img
                    src={MagnifierIcon}
                    alt="Увеличить"
                    className={styles.magnifier}
                  />

                </div>

                {/* NavLink to lot details */}
                <NavLink
                  to={generatePath(routes.openLot, { lot: lot.number })}
                  className={styles.info}
                >
                  {/* Inner info div */}
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

      {/* Pagination */}
      {totalPages > 1 && ( // Only show pagination if more than 1 page
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