// src/components/InformationAddition.tsx
import React, { useState, useEffect, forwardRef, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import * as styles from './InformationAddition.module.css';
import Search from './Search';
import Contacts from './Contacts';
import CollectedIcon from '../icons/collected.svg';
import ExpendedIcon from '../icons/expended.svg';
import CollectedWhiteIcon from '../icons/collectedWhite.svg';
import ExpendedWhiteIcon from '../icons/expendedWhite.svg';
import CalendarIcon from '../icons/calendar.svg';
import CheckmarkIcon from '../icons/checkmark.svg';
import { useAuthModal } from '../contexts/AuthFlowModalContext';
import { routes } from '../routes';

// ИМПОРТЫ ДЛЯ REDUX
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import {
  toggleLocationFilter,
  toggleEventFilter,
  toggleCategoryFilter,
  setSortOption, // !!! ДОБАВЛЕНО !!!
  setFilters,
  // Удален setSearchTerm
} from '../store/slices/filterSortSlice';
// КОНЕЦ ИМПОРТОВ ДЛЯ REDUX


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
}

interface FilterType {
  name: string;
  count: number;
}

const sortOptions = [
  { label: 'По названию (А-Я)', value: 'title-asc' },
  { label: 'По названию (Я-А)', value: 'title-desc' },
  { label: 'По городу (А-Я)', value: 'city-asc' },
  { label: 'По городу (Я-А)', value: 'city-desc' },
  { label: 'По возрастанию стартовой стоимости', value: 'price-asc' },
  { label: 'По убыванию стартовой стоимости', value: 'price-desc' },
];

const InformationAddition = forwardRef<HTMLInputElement, {}>(
  (_, ref) => {
    const location = useLocation();
    const isFavoritePage = location.pathname === routes.favorite;
    const { open } = useAuthModal();

    // !!! ЧТЕНИЕ СОСТОЯНИЯ ИЗ REDUX !!!
    const dispatch = useDispatch<AppDispatch>();
    const { allLots, selectedLocations, selectedEvents, selectedCategories, selectedSort } = useSelector(
      (state: RootState) => state.filterSort
    );
    // !!! КОНЕЦ ЧТЕНИЯ СОСТОЯНИЯ ИЗ REDUX !!!

    // Локальное состояние для UI (открытие/закрытие выпадающих списков)
    const [showFiltersMobile, setShowFiltersMobile] = useState(true);
    const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
    const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
    const [eventDropdownOpen, setEventDropdownOpen] = useState(false);
    const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
    const [infoDropdownOpen, setInfoDropdownOpen] = useState(true);

    // Эффект для адаптивности (оставляем как есть)
    useEffect(() => {
      const handleResize = () => {
        setShowFiltersMobile(window.innerWidth > 1260);
      };

      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    // ФУНКЦИЯ ДЛЯ ПРИМЕНЕНИЯ ДРУГИХ ФИЛЬТРОВ
    const applyOtherFilters = (
      lots: Lot[],
      currentFilterType: 'location' | 'event' | 'category',
      locs: string[],
      events: string[],
      cats: string[]
    ): Lot[] => {
      return lots.filter(lot => {
        // Фильтруем по локациям, если текущий фильтр НЕ локация И выбраны локации (без учета регистра)
        const matchLocation = currentFilterType === 'location' || locs.length === 0 || (lot.city !== undefined && locs.map(l => l.toLowerCase()).includes(lot.city.toLowerCase()));
        // Фильтруем по событиям, если текущий фильтр НЕ событие И выбраны события (без учета регистра)
        const matchEvent = currentFilterType === 'event' || events.length === 0 || (lot.event !== undefined && events.map(e => e.toLowerCase()).includes(lot.event.toLowerCase()));
        // Фильтруем по категориям, если текущий фильтр НЕ категория И выбраны категории (без учета регистра)
        const matchCategory = currentFilterType === 'category' || cats.length === 0 || (lot.category !== undefined && cats.map(c => c.toLowerCase()).includes(lot.category.toLowerCase()));

        return matchLocation && matchEvent && matchCategory;
      });
    };


    // !!! ДИНАМИЧЕСКИЕ СПИСКИ ФИЛЬТРОВ С КОЛИЧЕСТВОМ !!!
    const dynamicLocations = useMemo(() => {
      const lotsAfterOtherFilters = applyOtherFilters(allLots, 'location', selectedLocations, selectedEvents, selectedCategories);

      const counts = lotsAfterOtherFilters.reduce((acc, lot) => {
        if (lot.city !== undefined) {
          acc[lot.city] = (acc[lot.city] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

      return Object.keys(counts).map(name => ({ name, count: counts[name] })).sort((a, b) => a.name.localeCompare(b.name));

    }, [allLots, selectedLocations, selectedEvents, selectedCategories]); // Добавлена selectedLocations как зависимость для корректного пересчета


    const dynamicEvents = useMemo(() => {
      const lotsAfterOtherFilters = applyOtherFilters(allLots, 'event', selectedLocations, selectedEvents, selectedCategories);

      const counts = lotsAfterOtherFilters.reduce((acc, lot) => {
        if (lot.event !== undefined) {
          acc[lot.event] = (acc[lot.event] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

      return Object.keys(counts).map(name => ({ name, count: counts[name] })).sort((a, b) => a.name.localeCompare(b.name));

    }, [allLots, selectedLocations, selectedEvents, selectedCategories]); // Добавлена selectedEvents как зависимость


    const dynamicCategories = useMemo(() => {
      const lotsAfterOtherFilters = applyOtherFilters(allLots, 'category', selectedLocations, selectedEvents, selectedCategories);

      const counts = lotsAfterOtherFilters.reduce((acc, lot) => {
        if (lot.category !== undefined) {
          acc[lot.category] = (acc[lot.category] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

      return Object.keys(counts).map(name => ({ name, count: counts[name] })).sort((a, b) => a.name.localeCompare(b.name));

    }, [allLots, selectedLocations, selectedEvents, selectedCategories]); // Добавлена selectedCategories как зависимость
    // !!! КОНЕЦ ДИНАМИЧЕСКИХ СПИСКОВ !!!


    // ПЕРЕРАСЧЕТ HASFILTERS
    const hasFilters =
      selectedLocations.length > 0 ||
      selectedEvents.length > 0 ||
      selectedCategories.length > 0;


    // ФУНКЦИЯ ДЛЯ ПЕРЕКЛЮЧЕНИЯ ФИЛЬТРА (оставляем как есть)
    const toggleFilter = (filter: string, type: 'location' | 'event' | 'category') => {
      switch (type) {
        case 'location':
          dispatch(toggleLocationFilter(filter));
          break;
        case 'event':
          dispatch(toggleEventFilter(filter));
          break;
        case 'category':
          dispatch(toggleCategoryFilter(filter));
          break;
      }
    };


    // ФУНКЦИЯ ДЛЯ ОЧИСТКИ ФИЛЬТРОВ (теперь без searchTerm)
    const clearFilters = () => {
      dispatch(setFilters({ locations: [], events: [], categories: [] }));
    };


    const renderFilterSection = (
      title: string,
      items: FilterType[],
      selectedItems: string[],
      isOpen: boolean,
      toggleOpen: () => void,
      onChange: (name: string, type: 'location' | 'event' | 'category') => void,
      filterType: 'location' | 'event' | 'category'
    ) => (
      <div className={styles.filterWrapper}>
        <div className={styles.sectionWrapper} onClick={toggleOpen}>
          <span className={styles.sectionTitle}>{title}</span>
          <img
            src={isOpen ? ExpendedIcon : CollectedIcon}
            alt={`Toggle ${title}`}
            className={styles.sortIcon}
          />
        </div>
        {isOpen && (
          <ul className={styles.sortDropdown}>
            {items.map((item) => (
              <li key={item.name} className={styles.sortOption}>
                <label className={styles.checkboxItem}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={selectedItems.includes(item.name)}
                    onChange={() => onChange(item.name, filterType)}
                  />
                  <div className={styles.filterItem}>
                    <span>{item.name}</span>
                    <span className={styles.itemCount}>{item.count}</span>
                  </div>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
    );

    if (isFavoritePage) {
      return (
        <div className={styles.informationAddition}>
          <Search ref={ref} />
          <Contacts />
        </div>
      );
    }

    return (
      <div className={styles.informationAddition}>
        <Search ref={ref} />

        <div className={styles.mobileAccordion} onClick={() => setShowFiltersMobile((prev) => !prev)}>
          <span>ИНФОРМАЦИЯ И ДОПОЛНЕНИЕ</span>
          <img
            src={showFiltersMobile ? ExpendedWhiteIcon : CollectedWhiteIcon}
            alt="Toggle"
            className={styles.mobileAccordionIcon}
          />
        </div>

        {showFiltersMobile && (
          <div className={styles.backColor}>
            <div className={styles.filterHeader}>
              <div className={styles.filterTitleRow}>
                <div className={styles.filterTitle}>ФИЛЬТРАЦИЯ</div>
                {hasFilters && (
                  <img src={CheckmarkIcon} alt="Checkmark" className={styles.filterIcon} />
                )}
              </div>
              <div
                className={`${styles.clearFilter} ${hasFilters ? styles.active : ''}`}
                onClick={clearFilters}
              >
                ОЧИСТИТЬ ФИЛЬТР
              </div>
            </div>

            {/* СОРТИРОВКА */}
            <div
              className={styles.sectionWrapper}
              onClick={() => setSortDropdownOpen((prev) => !prev)}
            >
              <span className={styles.sectionTitle}>СОРТИРОВКА</span>
              <img
                src={sortDropdownOpen ? ExpendedIcon : CollectedIcon}
                alt="Toggle Sort"
                className={styles.sortIcon}
              />
            </div>
            {sortDropdownOpen && (
              <ul className={styles.sortDropdown}>
                {sortOptions.map((option) => (
                  <li
                    key={option.value}
                    className={`${styles.sortOption} ${
                      selectedSort === option.value ? styles.activeOption : ''
                    }`}
                    onClick={() => {
                      // !!! Диспатч setSortOption корректно импортирован и используется !!!
                      dispatch(setSortOption(option.value));
                      setSortDropdownOpen(false);
                    }}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}

            {/* ФИЛЬТРЫ (ПЕРЕДАЕМ ДИНАМИЧЕСКИЕ СПИСКИ) */}
            {renderFilterSection(
              'ЛОКАЦИЯ',
              dynamicLocations,
              selectedLocations,
              locationDropdownOpen,
              () => setLocationDropdownOpen((prev) => !prev),
              toggleFilter,
              'location'
            )}

            {renderFilterSection(
              'СОБЫТИЕ',
              dynamicEvents,
              selectedEvents,
              eventDropdownOpen,
              () => setEventDropdownOpen((prev) => !prev),
              toggleFilter,
              'event'
            )}

            {renderFilterSection(
              'КАТЕГОРИЯ',
              dynamicCategories,
              selectedCategories,
              categoryDropdownOpen,
              () => setCategoryDropdownOpen((prev) => !prev),
              toggleFilter,
              'category'
            )}

            {/* ИНФОРМАЦИЯ */}
            <div className={styles.filterWrapper}>
              <div
                className={styles.sectionWrapper}
                onClick={() => setInfoDropdownOpen((prev) => !prev)}
              >
                <span className={styles.infoHeader}>ИНФОРМАЦИЯ</span>
                <img
                  src={infoDropdownOpen ? ExpendedIcon : CollectedIcon}
                  alt="Toggle Info"
                  className={styles.sortIcon}
                />
              </div>
              {infoDropdownOpen && (
                <div className={styles.infoSection}>
                  <ul className={styles.infoList}>
                    <li className={styles.infoListItem}>
                      <span className={styles.auctionDate}>
                        <img src={CalendarIcon} alt="" className={styles.icon} />
                        ДАТА АУКЦИОНА
                      </span>
                      <span className={styles.dateRange}>10 – 13 ЯНВАРЯ</span>
                    </li>
                  </ul>
                  <div className={styles.dateTime}>
                    <div className={styles.infoCeilTitle}>УТРО ПРОДАЖ</div>
                    <div>10–11 Января 6:00</div>
                    <div>Лоты (1–24)</div>
                  </div>
                  <div className={styles.dateTime}>
                    <div className={styles.infoCeilTitle}>ВЕЧЕР ПРОДАЖ</div>
                    <div>13 Января 18:00</div>
                    <div>Лоты (25–31)</div>
                  </div>
                </div>
              )}
            </div>

            {/* СЕКЦИЯ РЕГИСТРАЦИИ */}
            <div className={styles.infoSection}>
              <h3 className={styles.registrationHeader}>РЕГИСТРАЦИЯ ОТКРЫТА</h3>
              <p className={styles.infoText}>
                Зарегистрируйтесь сейчас, чтобы делать предварительные ставки или делать ставки в
                реальном времени в нашем цифровом зале продаж.
              </p>
              <button onClick={() => open('register')} className={styles.registerButton}>
                Зарегистрироваться
              </button>
            </div>
            <Contacts />
          </div>
        )}
      </div>
    );
  }
);

export default InformationAddition;