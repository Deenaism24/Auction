// src/components/InformationAddition.tsx
import React, { useState, useEffect, forwardRef } from 'react';
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
  setSortOption,
  setFilters, // Для очистки всех фильтров
  setSearchTerm, // Для поискового запроса
} from '../store/slices/filterSortSlice';
// КОНЕЦ ИМПОРТОВ ДЛЯ REDUX


interface FilterType {
  name: string;
  count: number; // Примечание: эти счетчики статичны. Для динамических счетчиков нужна другая логика.
}

// Эти данные можно загрузить один раз при старте приложения или получить с сервера
const locations: FilterType[] = [
  { name: 'DUBAI', count: 2 },
  { name: 'HONG KONG', count: 3 },
  { name: 'LONDON', count: 8 },
  { name: 'NEW YORK', count: 10 },
  { name: 'PARIS', count: 8 },
];

const events: FilterType[] = [
  { name: "Sotheby's", count: 9 },
  { name: "Christie's", count: 10 },
  { name: 'Phillips Contemporary', count: 3 },
];

const categories: FilterType[] = [
  { name: 'COINS', count: 2 },
  { name: 'STAMPS', count: 3 },
  { name: 'PAINTINGS', count: 8 },
  { name: 'PORCELAIN', count: 1 },
  { name: 'GLASS, CRYSTAL', count: 12 },
];

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
    const { selectedLocations, selectedEvents, selectedCategories, selectedSort, searchTerm } = useSelector(
      (state: RootState) => state.filterSort
    );
    // !!! КОНЕЦ ЧТЕНИЯ СОСТОЯНИЯ ИЗ REDUX !!!

    // Локальное состояние для UI (открытие/закрытие выпадающих списков)
    const [showFiltersMobile, setShowFiltersMobile] = useState(true);
    const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
    const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
    const [eventDropdownOpen, setEventDropdownOpen] = useState(false);
    const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
    const [infoDropdownOpen, setInfoDropdownOpen] = useState(true); // Убедитесь, что начальное состояние соответствует вашим нуждам

    // Эффект для адаптивности
    useEffect(() => {
      const handleResize = () => {
        setShowFiltersMobile(window.innerWidth > 1260);
      };

      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    // !!! ПЕРЕРАСЧЕТ HASFILTERS С УЧЕТОМ REDUX СОСТОЯНИЯ !!!
    const hasFilters =
      selectedLocations.length > 0 ||
      selectedEvents.length > 0 ||
      selectedCategories.length > 0 ||
      searchTerm !== '';
    // !!! КОНЕЦ ПЕРЕРАСЧЕТА HASFILTERS !!!


    // ФУНКЦИЯ ДЛЯ ПЕРЕКЛЮЧЕНИЯ ФИЛЬТРА - ТЕПЕРЬ ДИСПАТЧИТ REDUX ЭКШЕНЫ
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


    // ФУНКЦИЯ ДЛЯ ОЧИСТКИ ФИЛЬТРОВ - ТЕПЕРЬ ДИСПАТЧИТ REDUX ЭКШЕН
    const clearFilters = () => {
      // Очищаем все фильтры и поисковый запрос
      dispatch(setFilters({ locations: [], events: [], categories: [] }));
      dispatch(setSearchTerm('')); // Сбрасываем поисковый запрос
    };


    const renderFilterSection = (
      title: string,
      items: FilterType[],
      selectedItems: string[],
      isOpen: boolean,
      toggleOpen: () => void,
      onChange: (name: string, type: 'location' | 'event' | 'category') => void,
      filterType: 'location' | 'event' | 'category' // Добавляем тип фильтра
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
                    onChange={() => onChange(item.name, filterType)} // Передаем тип фильтра
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
        {/*<div>*/}
          <Search ref={ref} />
        {/*</div>*/}
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
                {/* Иконка галочки показывается, если есть ЛЮБЫЕ активные фильтры или поисковый запрос */}
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

            {/* ФИЛЬТРЫ */}
            {renderFilterSection(
              'ЛОКАЦИЯ',
              locations,
              selectedLocations,
              locationDropdownOpen,
              () => setLocationDropdownOpen((prev) => !prev),
              toggleFilter,
              'location'
            )}

            {renderFilterSection(
              'СОБЫТИЕ',
              events,
              selectedEvents,
              eventDropdownOpen,
              () => setEventDropdownOpen((prev) => !prev),
              toggleFilter,
              'event'
            )}

            {renderFilterSection(
              'КАТЕГОРИЯ',
              categories,
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