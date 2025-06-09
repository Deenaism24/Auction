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
import NextPageDIcon from '../icons/nextPageD.svg';
import DollarIcon from '../icons/dollar.svg';
import { useZoomPhotoModal } from '../contexts/ZoomPhotoModalContext';

// ИМПОРТЫ ДЛЯ REDUX
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { addFavorite, removeFavorite } from '../store/slices/favoritesSlice';


// Определяем тип лота (если есть в другом файле, используйте его)
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


// !!! ДОБАВЛЕН ПРОП ISFAVORITEPAGE !!!
interface LotGridProps {
  isFavoritePage?: boolean;
}

const LotGrid: React.FC<LotGridProps> = ({ isFavoritePage = false }) => {
// !!! КОНЕЦ ДОБАВЛЕННОГО ПРОПА !!!

  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth] = React.useState(getWindowWidth());
  const lotsPerPage = windowWidth >= 600 ? 9 : 4;

  // ЧТЕНИЕ ИЗ REDUX
  const allLots = useSelector((state: RootState) => state.filterSort.allLots) as Lot[];
  const favoriteLotIds = useSelector((state: RootState) => state.favorites.items); // ID избранных лотов (нужны в обоих режимах)
  const selectedLocations = useSelector((state: RootState) => state.filterSort.selectedLocations);
  const selectedEvents = useSelector((state: RootState) => state.filterSort.selectedEvents);
  const selectedCategories = useSelector((state: RootState) => state.filterSort.selectedCategories);
  const selectedSort = useSelector((state: RootState) => state.filterSort.selectedSort);
  const searchTerm = useSelector((state: RootState) => state.filterSort.searchTerm);
  // КОНЕЦ ЧТЕНИЯ ИЗ REDUX


  // !!! ЛОГИКА ФИЛЬТРАЦИИ И СОРТИРОВКИ (АДАПТИРОВАНА) !!!
  const filteredAndSortedLots = useMemo(() => {
    let workingLots = allLots; // Начинаем с полного списка

    // 1. Если это страница избранного, сначала фильтруем по избранным ID
    if (isFavoritePage) {
      workingLots = workingLots.filter(lot => favoriteLotIds.includes(lot.id));
    }

    // 2. Применяем фильтры (только на главной странице)
    if (!isFavoritePage) {
      if (selectedLocations.length > 0) {
        const lowerSelectedLocations = selectedLocations.map(loc => loc.toLowerCase());
        workingLots = workingLots.filter(lot =>
          lot.city !== undefined && lowerSelectedLocations.includes(lot.city.toLowerCase())
        );
      }
      if (selectedEvents.length > 0) {
        const lowerSelectedEvents = selectedEvents.map(event => event.toLowerCase());
        workingLots = workingLots.filter(lot =>
          lot.event !== undefined && lowerSelectedEvents.includes(lot.event.toLowerCase())
        );
      }
      if (selectedCategories.length > 0) {
        const lowerSelectedCategories = selectedCategories.map(cat => cat.toLowerCase());
        workingLots = workingLots.filter(lot =>
          lot.category !== undefined && lowerSelectedCategories.includes(lot.category.toLowerCase())
        );
      }
    }


    // 3. Применяем фильтр по поисковому запросу (в обоих режимах)
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      workingLots = workingLots.filter(lot =>
          (lot.title && lot.title.toLowerCase().includes(lowerCaseSearchTerm)) ||
          (lot.number !== undefined && lot.number.toString().toLowerCase().includes(lowerCaseSearchTerm))
        // Можно добавить поиск по другим полям, например, city, event, category,
        // но только если это уместно для поиска (не для фильтров)
      );
    }


    // 4. Применяем сортировку (используем Redux state, если применим)
    const sortedLots = [...workingLots];
    // На странице избранного можно использовать дефолтную сортировку или ту же selectedSort
    // Если selectedSort должен влиять на страницу избранного, оставляем switch.
    // Если нет, используйте дефолтную: sortedLots.sort((a,b) => ...);
    // Пока оставим использование selectedSort в обоих режимах
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

  }, [allLots, favoriteLotIds, isFavoritePage, selectedLocations, selectedEvents, selectedCategories, selectedSort, searchTerm]); // !!! ДОБАВЛЕНЫ/ИЗМЕНЕНЫ ЗАВИСИМОСТИ !!!
  // !!! КОНЕЦ ЛОГИКИ ФИЛЬТРАЦИИ И СОРТИРОВКИ !!!


  // !!! ЭФФЕКТЫ ДЛЯ СБРОСА СТРАНИЦЫ (АДАПТИРОВАНЫ) !!!
  // Сброс страницы при изменении списка избранного (только на странице избранного)
  useEffect(() => {
    if (isFavoritePage) {
      setCurrentPage(1);
      // window.scrollTo({ top: 0, behavior: 'smooth' }); // Опционально, если нужен скролл при изменении избранного
    }
  }, [favoriteLotIds, isFavoritePage]); // Зависит от списка избранных ID и режима страницы

  // Сброс страницы и прокрутка вверх при изменении сортировки (в обоих режимах)
  useEffect(() => {
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedSort]); // Зависит только от выбранной опции сортировки

  // Сброс страницы (без прокрутки) при изменении фильтров (только на главной)
  useEffect(() => {
    if (!isFavoritePage) {
      setCurrentPage(1);
    }
  }, [selectedLocations, selectedEvents, selectedCategories, isFavoritePage]); // Зависит от фильтров и режима страницы

  // Сброс страницы (без прокрутки) при изменении поиска (в обоих режимах)
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]); // Зависит только от поискового запроса
  // !!! КОНЕЦ ЭФФЕКТОВ !!!


  // РАСЧЕТ HASFILTERS ЛОКАЛЬНО (АДАПТИРОВАН)
  // На главной странице активные фильтры - это Локация/Событие/Категория ИЛИ поиск
  // На странице избранного активные фильтры - это только поиск
  const hasActiveFilters = isFavoritePage
    ? searchTerm !== ''
    : selectedLocations.length > 0 || selectedEvents.length > 0 || selectedCategories.length > 0 || searchTerm !== '';
  const hasActiveSearch = searchTerm !== ''; // Этот флаг нужен для сообщения о поиске

  // Общее количество страниц теперь зависит от filteredAndSortedLots
  const totalPages = filteredAndSortedLots.length === 0 ? 1 : Math.ceil(filteredAndSortedLots.length / lotsPerPage);
  // Если текущая страница стала больше нового общего количества страниц
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (currentPage === 0 && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * lotsPerPage;
  // Получаем лоты для текущей страницы ИЗ отфильтрованного и отсортированного списка
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
  // В FavoriteGrid логика добавления в избранное не нужна, только удаление
  const handleToggleFavorite = (event: React.MouseEvent, lotId: number) => {
    event.preventDefault();
    event.stopPropagation(); // Останавливаем всплытие клика
    // В этом универсальном компоненте вызываем либо add, либо remove
    if (favoriteLotIds.includes(lotId)) {
      dispatch(removeFavorite(lotId));
    } else {
      dispatch(addFavorite(lotId));
    }
  };


  // Генерируем элементы пагинации для отображения
  const paginationItems = totalPages > 1 ? getPaginationItems(currentPage, totalPages) : [];


  return (
    <div>
      {/* !!! Отображаем сообщение, если лоты не найдены (АДАПТИРОВАНО) !!! */}
      {filteredAndSortedLots.length === 0 && (
        <div className={styles.noResults}>
          {allLots.length === 0 ? (
            'Данные о лотах отсутствуют.' // Если исходный список пуст
          ) : isFavoritePage && favoriteLotIds.length === 0 ? (
            'Список избранного пуст.' // Если на странице избранного и избранных лотов нет
          ) : hasActiveSearch ? ( // Если есть активный поиск
            isFavoritePage ? (
              `Среди избранного поиск по запросу "${searchTerm}" не дал результатов.` // Поиск по избранным
            ) : (
              `Поиск по запросу "${searchTerm}" не дал результатов.` // Поиск по всему списку
            )
          ) : hasActiveFilters && !isFavoritePage ? ( // Если есть активные фильтры (кроме поиска) и это не страница избранного
            `Нет лотов, соответствующих выбранным фильтрам.`
          ) : (
            'Нет лотов для отображения.' // Этот случай маловероятен
          )}
        </div>
      )}
      {/* !!! КОНЕЦ СООБЩЕНИЯ !!! */}

      {/* Рендерим сетку, только если есть лоты для текущей страницы */}
      {currentLots.length > 0 && (
        <div className={styles.grid}>
          {currentLots.map((lot) => {
            // Проверяем, является ли этот лот избранным (для отображения иконки и логики remove/add)
            const isFavorite = favoriteLotIds.includes(lot.id);

            // Здесь обработчик всегда один - переключение избранного
            const handleClickFavorite = (event: React.MouseEvent) => {
              handleToggleFavorite(event, lot.id);
            };

            return (
              <div key={lot.id} className={styles.card}>
                {/* Единый контейнер изображения с обработчиком клика для попапа */}
                <div
                  className={styles.imageWrapper}
                  onClick={() => openImagePopup(lot.image)} // Клик по обертке вызывает попап
                >
                  <img src={lot.image} alt={lot.title} className={styles.image} />

                  {/* !!! ИКОНКА ИЗБРАННОГО (IMG) - АДАПТИРОВАНО !!! */}
                  {/* Используем класс .favoriteIcon. active, если лот в избранном */}
                  {/* В FavoriteGrid иконка всегда .active */}
                  <img
                    // Выбираем иконку: FavoriteLotIcon, если в избранном ИЛИ если это страница избранного
                    // AddFavoriteLotIcon, если НЕ в избранном И НЕ страница избранного
                    src={(isFavorite || isFavoritePage) ? FavoriteLotIcon : AddFavoriteLotIcon}
                    alt={isFavorite ? 'В избранном' : 'Добавить в избранное'} // Alt-текст
                    // Добавляем класс .active, если лот в избранном ИЛИ если это страница избранного
                    className={`${styles.favoriteIcon} ${(isFavorite || isFavoritePage) ? styles.active : ''}`}
                    onClick={handleClickFavorite} // Обработчик клика
                  />
                  {/* !!! КОНЕЦ ИКОНКИ ИЗБРАННОГО !!! */}

                  {/* ИКОНКА УВЕЛИЧИТЕЛЬНОГО СТЕКЛА (IMG) - Оставляем как есть */}
                  <img
                    src={MagnifierIcon}
                    alt="Увеличить"
                    className={styles.magnifier}
                    // Видимость управляется CSS .card:hover .magnifier
                  />

                </div>

                {/* NavLink для перехода на страницу лота */}
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