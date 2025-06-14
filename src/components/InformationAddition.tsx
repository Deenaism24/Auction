// src/components/InformationAddition.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as styles from './InformationAddition.module.css';
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
  setSortOption,
  setFilters,
  setSearchTerm,
} from '../store/slices/filterSortSlice';

// Определяем тип лота
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

const InformationAddition = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Импортируем useNavigate для перехода в ЛК
  const isFavoritePage = location.pathname === routes.favorite;
  const { open } = useAuthModal();

  // ЧТЕНИЕ СОСТОЯНИЯ ИЗ REDUX (фильтры/сортировка/поиск)
  const dispatch = useDispatch<AppDispatch>();
  const { allLots, selectedLocations, selectedEvents, selectedCategories, selectedSort, searchTerm } = useSelector(
    (state: RootState) => state.filterSort
  );

  // !!! ЧТЕНИЕ СОСТОЯНИЯ АВТОРИЗАЦИИ ИЗ REDUX !!!
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  // Локальное состояние для UI (открытие/закрытие выпадающих списков)
  const [showFiltersMobile, setShowFiltersMobile] = useState(true);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [eventDropdownOpen, setEventDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [infoDropdownOpen, setInfoDropdownOpen] = useState(true);

  // Эффект для адаптивности
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
      const matchLocation = currentFilterType === 'location' || locs.length === 0 || (lot.city !== undefined && locs.map(l => l.toLowerCase()).includes(lot.city.toLowerCase()));
      const matchEvent = currentFilterType === 'event' || events.length === 0 || (lot.event !== undefined && events.map(e => e.toLowerCase()).includes(lot.event.toLowerCase()));
      const matchCategory = currentFilterType === 'category' || cats.length === 0 || (lot.category !== undefined && cats.map(c => c.toLowerCase()).includes(lot.category.toLowerCase()));

      return matchLocation && matchEvent && matchCategory;
    });
  };


  // ДИНАМИЧЕСКИЕ СПИСКИ ФИЛЬТРОВ С КОЛИЧЕСТВОМ
  const filteredLotsForCounts = useMemo(() => {
    let lots = allLots;

    if (selectedLocations.length > 0) {
      const lowerSelectedLocations = selectedLocations.map(loc => loc.toLowerCase());
      lots = lots.filter(lot => lot.city !== undefined && lowerSelectedLocations.includes(lot.city.toLowerCase()));
    }
    if (selectedEvents.length > 0) {
      const lowerSelectedEvents = selectedEvents.map(event => event.toLowerCase());
      lots = lots.filter(lot => lot.event !== undefined && lowerSelectedEvents.includes(lot.event.toLowerCase()));
    }
    if (selectedCategories.length > 0) {
      const lowerSelectedCategories = selectedCategories.map(cat => cat.toLowerCase());
      lots = lots.filter(lot => lot.category !== undefined && lowerSelectedCategories.includes(lot.category.toLowerCase()));
    }
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      lots = lots.filter(lot =>
        (lot.title && lot.title.toLowerCase().includes(lowerCaseSearchTerm)) ||
        (lot.number !== undefined && lot.number.toString().toLowerCase().includes(lowerCaseSearchTerm))
      );
    }
    return lots;

  }, [allLots, selectedLocations, selectedEvents, selectedCategories, searchTerm]);


  const dynamicLocations = useMemo(() => {
    const lotsForLocationCount = applyOtherFilters(filteredLotsForCounts, 'location', [], selectedEvents, selectedCategories);

    const counts = lotsForLocationCount.reduce((acc, lot) => {
      if (lot.city !== undefined) {
        acc[lot.city] = (acc[lot.city] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return Object.keys(counts).map(name => ({ name, count: counts[name] })).sort((a, b) => a.name.localeCompare(b.name));

  }, [filteredLotsForCounts, selectedEvents, selectedCategories]);


  const dynamicEvents = useMemo(() => {
    const lotsForEventCount = applyOtherFilters(filteredLotsForCounts, 'event', selectedLocations, [], selectedCategories);

    const counts = lotsForEventCount.reduce((acc, lot) => {
      if (lot.event !== undefined) {
        acc[lot.event] = (acc[lot.event] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return Object.keys(counts).map(name => ({ name, count: counts[name] })).sort((a, b) => a.name.localeCompare(b.name));

  }, [filteredLotsForCounts, selectedLocations, selectedCategories]);


  const dynamicCategories = useMemo(() => {
    const lotsForCategoryCount = applyOtherFilters(filteredLotsForCounts, 'category', selectedLocations, selectedEvents, []);

    const counts = lotsForCategoryCount.reduce((acc, lot) => {
      if (lot.category !== undefined) {
        acc[lot.category] = (acc[lot.category] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return Object.keys(counts).map(name => ({ name, count: counts[name] })).sort((a, b) => a.name.localeCompare(b.name));

  }, [filteredLotsForCounts, selectedLocations, selectedEvents]);

  // ПЕРЕРАСЧЕТ HASFILTERS
  const hasFilters =
    selectedLocations.length > 0 ||
    selectedEvents.length > 0 ||
    selectedCategories.length > 0 ||
    searchTerm !== '';


  // ФУНКЦИЯ ДЛЯ ПЕРЕКЛЮЧЕНИЯ ФИЛЬТРА
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


  // ФУНКЦИЯ ДЛЯ ОЧИСТКИ ФИЛЬТРОВ
  const clearFilters = () => {
    dispatch(setFilters({ locations: [], events: [], categories: [] }));
    dispatch(setSearchTerm(''));
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
            (item.count > 0 || selectedItems.includes(item.name)) && (
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
            )
          ))}
        </ul>
      )}
    </div>
  );

  // Условный рендеринг содержимого InformationAddition
  return (
    <div className={styles.informationAddition}>
      {isFavoritePage ? (
        <Contacts />
      ) : (
        // Рендерим фильтры, сортировку и остальную информацию на других страницах
        <>
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
              {dynamicLocations.length > 0 && renderFilterSection(
                'ЛОКАЦИЯ',
                dynamicLocations,
                selectedLocations,
                locationDropdownOpen,
                () => setLocationDropdownOpen((prev) => !prev),
                toggleFilter,
                'location'
              )}

              {dynamicEvents.length > 0 && renderFilterSection(
                'СОБЫТИЕ',
                dynamicEvents,
                selectedEvents,
                eventDropdownOpen,
                () => setEventDropdownOpen((prev) => !prev),
                toggleFilter,
                'event'
              )}

              {dynamicCategories.length > 0 && renderFilterSection(
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

              {/* !!! СЕКЦИЯ РЕГИСТРАЦИИ / ЛИЧНОГО КАБИНЕТА */}
              <div className={styles.infoSection}>
                {isAuthenticated ? (
                  // Если авторизован - кнопка Личный кабинет
                  <>
                    <h3 className={styles.registrationHeader}>ЛИЧНЫЙ КАБИНЕТ</h3>
                    <p className={styles.infoText}>Управляйте вашим профилем, историей покупок и избранными лотами.</p>
                    <button onClick={() => navigate(routes.personalAccount)} className={styles.registerButton}>
                      Перейти в кабинет
                    </button>
                  </>
                ) : (
                  // Если не авторизован - кнопка Регистрация
                  <>
                    <h3 className={styles.registrationHeader}>РЕГИСТРАЦИЯ ОТКРЫТА</h3>
                    <p className={styles.infoText}>
                      Зарегистрируйтесь сейчас, чтобы делать предварительные ставки или делать ставки в
                      реальном времени в нашем цифровом зале продаж.
                    </p>
                    <button onClick={() => open('register')} className={styles.registerButton}>
                      Зарегистрироваться
                    </button>
                  </>
                )}
              </div>

              <Contacts />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default InformationAddition;