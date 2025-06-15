// src/components/LotGrid.tsx
import React, { useState, useEffect, useMemo } from 'react';
import * as styles from './LotGrid.module.css';
import { generatePath, NavLink } from 'react-router'; // Хуки и компоненты для маршрутизации
import { routes } from '../routes'; // Объект с путями роутов
// Импорты иконок
import FavoriteLotIcon from '../icons/favoriteLot.svg';
import AddFavoriteLotIcon from '../icons/addFavoriteLot.svg';
import MagnifierIcon from '../icons/magnifier.svg';
import BackPageAIcon from '../icons/backpageA.svg';
import BackPageDIcon from '../icons/backpageD.svg';
import NextPageAIcon from '../icons/nextpageA.svg';
import NextPageDIcon from '../icons/nextPageD.svg';
import DollarIcon from '../icons/dollar.svg';
import { useZoomPhotoModal } from '../contexts/ZoomPhotoModalContext'; // Хук для модалки увеличения фото

// ИМПОРТЫ ДЛЯ REDUX
import { useSelector, useDispatch } from 'react-redux'; // Хуки Redux
import { RootState, AppDispatch } from '../store'; // Типы состояния и диспатча
import { addFavorite, removeFavorite } from '../store/slices/favoritesSlice'; // Экшены для избранного
// Import Lot type from filterSortSlice for consistency
import { Lot } from '../store/slices/filterSortSlice'; // Тип лота

// Вспомогательная функция для получения ширины окна
function getWindowWidth() {
  return window.innerWidth;
}

// !!! ОБНОВЛЕННАЯ ЛОГИКА ГЕНЕРАЦИИ ЭЛЕМЕНТОВ ПАГИНАЦИИ !!!
// Генерирует массив для отображения пагинации: [1] ... [C] ... [T]
const getPaginationItems = (currentPage: number, totalPages: number): (number | string)[] => {
  const T = totalPages; // Общее количество страниц
  const C = currentPage; // Текущая страница

  const items = new Set<number>(); // Используем Set для автоматической уникальности

  if (T <= 1) {
    return [1]; // Если всего 1 страница, показываем только [1]
  }
  // Всегда добавляем первую (1) и последнюю (T) страницы
  items.add(1);
  if (C > 1 && C < T) { // Если текущая страница не первая и не последняя, добавляем ее
    items.add(C);
  }
  items.add(T);

  // Преобразуем Set в Array и сортируем по возрастанию
  const sortedUniquePages = Array.from(items).sort((a, b) => a - b);

  const finalItems: (number | string)[] = [];

  if (sortedUniquePages.length > 0) {
    // Добавляем первый элемент (который всегда 1)
    finalItems.push(sortedUniquePages[0]);

    // Проходим по отсортированному массиву, добавляя '...' если есть пропуск страниц > 1
    for (let i = 1; i < sortedUniquePages.length; i++) {
      const prev = sortedUniquePages[i - 1] as number;
      const current = sortedUniquePages[i] as number;

      if (current - prev > 1) {
        finalItems.push('...'); // Вставляем многоточие при пропуске
      }
      finalItems.push(current); // Добавляем номер текущей страницы из массива
    }
  }

  return finalItems; // Возвращаем итоговый массив для рендеринга
};
// !!! КОНЕЦ ОБНОВЛЕННОЙ ЛОГИКИ !!!


// Интерфейс пропсов компонента LotGrid
interface LotGridProps {
  isFavoritePage?: boolean; // Флаг: является ли это страница избранного
  favoriteSearchTerm?: string; // Локальный поисковый запрос для страницы избранного (опционально)
}

// Основной компонент LotGrid
const LotGrid: React.FC<LotGridProps> = ({ isFavoritePage = false, favoriteSearchTerm = '' }) => {
  const [currentPage, setCurrentPage] = useState(1); // Состояние для текущей страницы пагинации
  // Состояние для ширины окна (для определения lotsPerPage). Не обновляется при ресайзе.
  const [windowWidth] = React.useState(getWindowWidth());
  // Количество лотов на странице в зависимости от ширины
  const lotsPerPage = windowWidth >= 600 ? 9 : 4;


  // ЧТЕНИЕ СОСТОЯНИЯ ИЗ REDUX
  const allLots = useSelector((state: RootState) => state.filterSort.allLots) as Lot[]; // Полный список лотов
  const favoriteLotIds = useSelector((state: RootState) => state.favorites.items); // ID лотов в избранном

  // Читаем фильтры и глобальный поисковый запрос ТОЛЬКО если это НЕ страница избранного
  const selectedLocations = !isFavoritePage ? useSelector((state: RootState) => state.filterSort.selectedLocations) : [];
  const selectedEvents = !isFavoritePage ? useSelector((state: RootState) => state.filterSort.selectedEvents) : [];
  const selectedCategories = !isFavoritePage ? useSelector((state: RootState) => state.filterSort.selectedCategories) : [];

  // Читаем глобальный поисковый запрос ТОЛЬКО если это НЕ страница избранного
  const globalSearchTerm = !isFavoritePage ? useSelector((state: RootState) => state.filterSort.searchTerm) : '';

  // Читаем выбранную опцию сортировки (сортировка применяется к отфильтрованному списку на обеих страницах)
  const selectedSort = useSelector((state: RootState) => state.filterSort.selectedSort);


  // Определяем, какой поисковый запрос использовать: локальный (для избранного) или глобальный (для главной)
  const currentSearchTerm = isFavoritePage ? favoriteSearchTerm : globalSearchTerm;


  // ЛОГИКА ФИЛЬТРАЦИИ И СОРТИРОВКИ (мемоизирована для производительности)
  // Пересчитывается только при изменении соответствующих зависимостей
  const filteredAndSortedLots = useMemo(() => {
    let workingLots = allLots; // Начинаем с полного списка

    // 1. Фильтруем по избранному, если мы на странице избранного
    if (isFavoritePage) {
      workingLots = workingLots.filter(lot => favoriteLotIds.includes(lot.id));
    }

    // 2. Применяем фильтры (только на главной странице)
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

    // 3. Применяем фильтр по поисковому запросу (используем определенный currentSearchTerm)
    if (currentSearchTerm) {
      const lowerCaseSearchTerm = currentSearchTerm.toLowerCase();
      workingLots = workingLots.filter(lot =>
        (lot.title && lot.title.toLowerCase().includes(lowerCaseSearchTerm)) ||
        (lot.number !== undefined && lot.number !== null && lot.number.toString().toLowerCase().includes(lowerCaseSearchTerm))
      );
    }

    // 4. Применяем сортировку (используем глобальное состояние Redux)
    const sortedLots = [...workingLots]; // Создаем копию для сортировки, чтобы не мутировать исходный массив
    switch (selectedSort) {
      case 'title-asc': sortedLots.sort((a, b) => (a.title || '').localeCompare(b.title || '')); break;
      case 'title-desc': sortedLots.sort((a, b) => (b.title || '').localeCompare(a.title || '')); break;
      case 'city-asc': sortedLots.sort((a, b) => {
        const cityA = a.city || ''; // Пустые/null города идут в начале/конце в зависимости от сортировки
        const cityB = b.city || '';
        return cityA.localeCompare(cityB);
      }); break;
      case 'city-desc': sortedLots.sort((a, b) => {
        const cityA = a.city || '';
        const cityB = b.city || '';
        return cityB.localeCompare(cityA);
      }); break;
      case 'price-asc': sortedLots.sort((a, b) => {
        // Парсим цену, удаляя запятые и обрабатывая undefined/null как 0
        const priceA = parseFloat((a.price || '0').replace(/,/g, ''));
        const priceB = parseFloat((b.price || '0').replace(/,/g, ''));
        // Обрабатываем нечисловые цены (они будут NaN после парсинга)
        if (isNaN(priceA) && isNaN(priceB)) return 0; // Обе нечисловые - порядок не важен
        if (isNaN(priceA)) return 1; // priceA нечисловая, идет после priceB
        if (isNaN(priceB)) return -1; // priceB нечисловая, идет после priceA
        return priceA - priceB; // Числовая сортировка
      }); break;
      case 'price-desc': sortedLots.sort((a, b) => {
        const priceA = parseFloat((a.price || '0').replace(/,/g, ''));
        const priceB = parseFloat((b.price || '0').replace(/,/g, ''));
        if (isNaN(priceA) && isNaN(priceB)) return 0;
        if (isNaN(priceA)) return 1; // priceA нечисловая, идет после priceB (в убывающей сортировке тоже)
        if (isNaN(priceB)) return -1; // priceB нечисловая, идет после priceA (в убывающей сортировке тоже)
        return priceB - priceA; // Числовая сортировка в обратном порядке
      }); break;
      default: sortedLots.sort((a, b) => a.id - b.id); break; // Сортировка по умолчанию по ID
    }

    return sortedLots; // Возвращаем отфильтрованный и отсортированный список
  }, [
    allLots,
    favoriteLotIds, // Зависимость для фильтрации избранного
    isFavoritePage, // Зависимость для переключения режимов фильтрации
    selectedLocations, // Зависимость для фильтров на главной
    selectedEvents, // Зависимость для фильтров на главной
    selectedCategories, // Зависимость для фильтров на главной
    selectedSort, // Зависимость для сортировки
    globalSearchTerm, // Зависимость для поиска на главной
    favoriteSearchTerm // Зависимость для поиска на странице избранного (из пропса)
  ]);

  // Эффект для сброса текущей страницы пагинации на 1 и прокрутки вверх
  // Срабатывает при любом изменении фильтров, сортировки или поиска, которые могут изменить список лотов
  useEffect(() => {
    setCurrentPage(1); // Сбрасываем страницу на первую
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Плавно прокручиваем в верх страницы
  }, [
    selectedLocations,
    selectedEvents,
    selectedCategories,
    selectedSort,
    globalSearchTerm,
    favoriteSearchTerm, // Сбрасываем страницу при изменении локального поиска избранного
    favoriteLotIds, // Сбрасываем страницу, если изменился список избранного (особенно важно на странице избранного)
    // isFavoritePage - не нужна как зависимость, так как этот эффект находится внутри компонента, который сам рендерится в зависимости от этой пропсы.
  ]);


  // Вычисляем общее количество страниц на основе отфильтрованного списка
  const totalPages = filteredAndSortedLots.length === 0 ? 1 : Math.ceil(filteredAndSortedLots.length / lotsPerPage);

  // Эффект для корректировки текущей страницы, если она вышла за пределы после фильтрации
  // Например, если мы были на 5 странице, а после фильтрации стало всего 3 страницы
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages); // Переходим на последнюю доступную страницу
    } else if (currentPage <= 0 && totalPages > 0) {
      setCurrentPage(1); // Корректируем на страницу 1, если как-то оказались на 0 или меньше
    } else if (totalPages === 0 && currentPage !== 1) {
      // Если лотов нет (total pages = 0 или 1), убеждаемся, что текущая страница = 1
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]); // Зависит от текущей страницы и общего количества страниц

  // Вычисляем начальный индекс лотов для текущей страницы
  const startIndex = (currentPage - 1) * lotsPerPage;
  // Получаем срез лотов для текущей страницы из отфильтрованного и отсортированного списка
  const currentLots = filteredAndSortedLots.slice(startIndex, startIndex + lotsPerPage);


  // Обработчик изменения страницы при клике на кнопки пагинации
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) { // Проверяем, что страница в допустимом диапазоне
      setCurrentPage(page); // Устанавливаем новую текущую страницу
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Прокручиваем вверх
    }
  };

  const { open } = useZoomPhotoModal(); // Получаем функцию открытия модалки фото
  const openImagePopup = (imageUrl: string) => {
    open(imageUrl); // Открываем модалку с переданным URL изображения
  };

  const dispatch = useDispatch<AppDispatch>(); // Получаем функцию dispatch
  // Обработчик для добавления/удаления лота из избранного
  const handleToggleFavorite = (event: React.MouseEvent, lotId: number) => {
    event.preventDefault(); // Предотвращаем стандартное поведение (например, переход по ссылке)
    event.stopPropagation(); // Останавливаем всплытие события (чтобы не сработал клик по обертке карточки)
    if (favoriteLotIds.includes(lotId)) {
      dispatch(removeFavorite(lotId)); // Удаляем лот из избранного, если он там есть
    } else {
      dispatch(addFavorite(lotId)); // Добавляем лот в избранное, если его там нет
    }
  };

  // Генерируем элементы пагинации для отображения (числа и многоточия)
  const paginationItems = totalPages > 1 ? getPaginationItems(currentPage, totalPages) : [];

  // Определяем подходящее сообщение, когда лоты не найдены после фильтрации/поиска
  const getNoResultsMessage = () => {
    if (allLots.length === 0) {
      return 'Данные о лотах отсутствуют.'; // Если исходный список пуст
    }
    // Сообщение для пустой страницы избранного, если нет поиска
    if (isFavoritePage && favoriteLotIds.length === 0 && !currentSearchTerm) {
      return 'Список избранного пуст.';
    }
    // Сообщение, если поиск (глобальный или локальный) не дал результатов
    if (currentSearchTerm) {
      return isFavoritePage ?
        `Среди избранного поиск по запросу "${currentSearchTerm}" не дал результатов.` :
        `Поиск по запросу "${currentSearchTerm}" не дал результатов.`;
    }
    // Сообщение, если фильтры (на главной) не дали результатов
    if (!isFavoritePage && (selectedLocations.length > 0 || selectedEvents.length > 0 || selectedCategories.length > 0)) {
      return `Нет лотов, соответствующих выбранным фильтрам.`;
    }
    // Общее сообщение, если после всех применений (фильтры, поиск) список пуст
    if (filteredAndSortedLots.length === 0) {
      return isFavoritePage ?
        'Нет лотов в избранном, соответствующих текущим критериям.' :
        'Нет лотов, соответствующих текущим критериям.';
    }
    return 'Нет лотов для отображения.'; // Редкий случай, если filteredAndSortedLots почему-то 0, но не подпадает под предыдущие условия
  };


  // JSX разметка компонента
  return (
    <div>
      {/* Отображаем сообщение "нет результатов", если список лотов для отображения пуст */}
      {filteredAndSortedLots.length === 0 && (
        <div className={styles.noResults}>
          {getNoResultsMessage()} {/* Вызываем функцию для получения нужного сообщения */}
        </div>
      )}
      {/* Рендерим сетку лотов, только если есть лоты для текущей страницы */}
      {currentLots.length > 0 && (
        <div className={styles.grid}>
          {currentLots.map((lot) => { // Проходим по лотам текущей страницы
            const isFavorite = favoriteLotIds.includes(lot.id); // Проверяем, находится ли лот в избранном
            const handleClickFavorite = (event: React.MouseEvent) => {
              handleToggleFavorite(event, lot.id); // Обработчик клика по иконке избранного
            };

            return (
              <div key={lot.id} className={styles.card}> {/* Карточка лота */}
                {/* Обертка изображения (кликабельна для попапа) */}
                <div
                  className={styles.imageWrapper}
                  onClick={() => openImagePopup(lot.image)} // Открывает модалку при клике
                >
                  <img src={lot.image} alt={lot.title} className={styles.image} /> {/* Изображение лота */}

                  {/* Иконка Избранного (добавить/удалить) */}
                  <img
                    src={isFavorite ? FavoriteLotIcon : AddFavoriteLotIcon} // Выбираем иконку в зависимости от статуса
                    alt={isFavorite ? 'В избранном' : 'Добавить в избранное'}
                    className={`${styles.favoriteIcon} ${isFavorite ? styles.active : ''}`} // Активный стиль, если в избранном
                    onClick={handleClickFavorite} // Обработчик клика
                  />

                  {/* Иконка лупы (увеличения) */}
                  <img
                    src={MagnifierIcon}
                    alt="Увеличить"
                    className={styles.magnifier}
                  />

                </div>

                {/* Ссылка на страницу с деталями лота (на весь блок информации) */}
                <NavLink
                  to={generatePath(routes.openLot, { lot: lot.number })} // Генерируем путь с номером лота
                  className={styles.info} // Применяем стили информационного блока
                >
                  {/* Блок информации о лоте */}
                  <div className={styles.info}> {/* Может быть избыточным, но соответствует исходной структуре */}
                    {/* Строка с номером лота */}
                    <div className={styles.numberRow}>
                      НОМЕР ЛОТА:
                      <span className={styles.numberValue}>{lot.number}</span>
                    </div>
                    {/* Название лота */}
                    <div className={styles.lotName}>
                      {lot.title}
                    </div>
                    {/* Блок с ценой */}
                    <div>
                      <div className={styles.priceLabel}>
                        <img src={DollarIcon} alt="Цена" /> {/* Иконка доллара */}
                        СТАРТОВАЯ ЦЕНА
                      </div>
                      {/* Значение цены лота */}
                      <div className={styles.priceValue}>{lot.price}</div>
                    </div>
                  </div>
                </NavLink>
              </div>
            );
          })}
        </div>
      )}

      {/* Пагинация (отображается, только если страниц больше одной) */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          {/* Кнопка "Назад" */}
          <button className={`${styles.pageBtn} ${currentPage === 1 ? styles.disabled : ''}`} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            <img src={currentPage === 1 ? BackPageAIcon : BackPageDIcon} alt="Назад" /> {/* Иконка в зависимости от состояния */}
            Назад
          </button>
          {/* Элементы пагинации (номера страниц и многоточия) */}
          {paginationItems.map((item, index) => {
            const key = typeof item === 'number' ? item : `ellipsis-${index}`; // Уникальный ключ для элементов списка
            if (item === '...') { return (<span key={key} className={styles.ellipsis}>...</span>); } // Если элемент - многоточие, рендерим span
            const pageNumber = item as number; // Иначе это номер страницы
            return (
              <button
                key={key}
                className={`${styles.pageNum} ${currentPage === pageNumber ? styles.active : ''}`} // Активный стиль для текущей страницы
                onClick={() => handlePageChange(pageNumber)} // Обработчик клика для перехода на страницу
                disabled={currentPage === pageNumber} // Отключаем кнопку текущей страницы
              >
                {pageNumber} {/* Номер страницы */}
              </button>
            );
          })}
          {/* Кнопка "Вперед" */}
          <button className={`${styles.pageBtn} ${currentPage === totalPages ? styles.disabled : ''}`} onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Вперед
            <img src={currentPage === totalPages ? NextPageAIcon : NextPageDIcon} alt="Вперед" /> {/* Иконка в зависимости от состояния */}
          </button>
        </div>
      )}
    </div>
  );
};

export default LotGrid;