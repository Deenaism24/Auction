// src/components/InformationAddition.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as styles from './InformationAddition.module.css';
import Contacts from './Contacts';
import CollectedIcon from '../icons/collected.svg'; // Иконка "свернуто" (черная)
import ExpendedIcon from '../icons/expended.svg'; // Иконка "развернуто" (черная)
import CollectedWhiteIcon from '../icons/collectedWhite.svg'; // Иконка "свернуто" (белая для мобильного аккордеона)
import ExpendedWhiteIcon from '../icons/expendedWhite.svg'; // Иконка "развернуто" (белая для мобильного аккордеона)
import CalendarIcon from '../icons/calendar.svg'; // Иконка календаря
import CheckmarkIcon from '../icons/checkmark.svg'; // Иконка галочки (для активных фильтров)
import { useAuthModal } from '../contexts/AuthFlowModalContext'; // Хук для работы с модальным окном авторизации
import { routes } from '../routes'; // Объект с путями роутов

// ИМПОРТЫ ДЛЯ REDUX
import { useSelector, useDispatch } from 'react-redux'; // Хуки Redux
import { RootState, AppDispatch } from '../store'; // Типы состояния и диспатча
import { // Экшены для управления фильтрами и сортировкой
  toggleLocationFilter,
  toggleEventFilter,
  toggleCategoryFilter,
  setSortOption,
  setFilters,
  setSearchTerm,
} from '../store/slices/filterSortSlice';

// Интерфейс для элементов списка фильтров (имя + количество)
interface FilterType {
  name: string;
  count: number;
}

// Опции сортировки с лейблами и значениями
const sortOptions = [
  { label: 'По названию (А-Я)', value: 'title-asc' },
  { label: 'По названию (Я-А)', value: 'title-desc' },
  { label: 'По городу (А-Я)', value: 'city-asc' },
  { label: 'По городу (Я-А)', value: 'city-desc' },
  { label: 'По возрастанию стартовой стоимости', value: 'price-asc' },
  { label: 'По убыванию стартовой стоимости', value: 'price-desc' },
];

// Основной компонент InformationAddition
const InformationAddition = () => {
  const location = useLocation(); // Информация о текущем URL
  const navigate = useNavigate(); // Функция для навигации (переход в ЛК)
  // Определяем, находимся ли мы на странице избранного
  const isFavoritePage = location.pathname === routes.favorite;
  const { open } = useAuthModal(); // Функция для открытия модалки авторизации

  // ЧТЕНИЕ СОСТОЯНИЯ ИЗ REDUX (фильтры/сортировка/поиск)
  const dispatch = useDispatch<AppDispatch>(); // Получаем функцию dispatch
  // Читаем необходимое состояние из Redux store
  const { allLots, selectedLocations, selectedEvents, selectedCategories, selectedSort, searchTerm } = useSelector(
    (state: RootState) => state.filterSort
  );

  // ЧТЕНИЕ СОСТОЯНИЯ АВТОРИЗАЦИИ ИЗ REDUX
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  // Локальное состояние для управления открытием/закрытием секций UI
  const [showFiltersMobile, setShowFiltersMobile] = useState(true); // Видимость всего блока на мобильных
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false); // Открыт ли выпадающий список сортировки
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false); // Открыт ли фильтр локаций
  const [eventDropdownOpen, setEventDropdownOpen] = useState(false); // Открыт ли фильтр событий
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false); // Открыт ли фильтр категорий
  const [infoDropdownOpen, setInfoDropdownOpen] = useState(true); // Открыта ли секция информации об аукционе

  // Эффект для управления видимостью блока на мобильных при изменении размера окна
  useEffect(() => {
    const handleResize = () => {
      // Показываем блок целиком, если ширина > 1260px, иначе скрываем (аккордеон)
      setShowFiltersMobile(window.innerWidth > 1260);
    };

    handleResize(); // Вызываем один раз при монтировании
    window.addEventListener('resize', handleResize); // Подписываемся на изменение размера
    return () => window.removeEventListener('resize', handleResize); // Отписываемся при размонтировании
  }, []); // Пустой массив зависимостей означает, что эффект сработает только при монтировании и размонтировании

  // МЕТОД ПОДСЧЕТА КОЛИЧЕСТВА ДЛЯ КАЖДОГО ЭЛЕМЕНТА ФИЛЬТРА
  // Возвращает массив объектов { name, count } для всех уникальных значений данного типа фильтра
  // count - это количество лотов, которые соответствуют другим выбранным фильтрам, поисковому запросу И этому значению фильтра.
  const getFilterCounts = (
    filterKey: 'city' | 'event' | 'category', // Ключ свойства лота
    selectedKeys: string[], // Выбранные значения для данного фильтра (игнорируются при подсчете лотов для этого ключа)
    otherSelectedLocations: string[], // Выбранные локации (если filterKey != 'city')
    otherSelectedEvents: string[], // Выбранные события (если filterKey != 'event')
    otherSelectedCategories: string[], // Выбранные категории (если filterKey != 'category')
    currentSearchTerm: string // Текущий поисковый запрос
  ): FilterType[] => {
    const counts: Record<string, number> = {}; // Хранит подсчитанные количества для каждого уникального значения
    const uniqueNames = new Set<string>(); // Хранит все уникальные значения данного фильтра

    const lowerOtherLocations = otherSelectedLocations.map(loc => loc.toLowerCase());
    const lowerOtherEvents = otherSelectedEvents.map(event => event.toLowerCase());
    const lowerOtherCategories = otherSelectedCategories.map(cat => cat.toLowerCase());
    const lowerSearchTerm = currentSearchTerm.toLowerCase();

    allLots.forEach(lot => {
      const filterValue = lot[filterKey]; // Получаем значение фильтра для текущего лота

      // Добавляем значение в список уникальных, если оно существует
      if (filterValue !== undefined && filterValue !== null) {
        const valueAsString = String(filterValue);
        uniqueNames.add(valueAsString);

        // Проверяем, соответствует ли лот ВСЕМ ДРУГИМ фильтрам и поисковому запросу
        const matchesOtherCriteria =
          (filterKey === 'city' || otherSelectedLocations.length === 0 || (lot.city && lowerOtherLocations.includes(lot.city.toLowerCase()))) &&
          (filterKey === 'event' || otherSelectedEvents.length === 0 || (lot.event && lowerOtherEvents.includes(lot.event.toLowerCase()))) &&
          (filterKey === 'category' || otherSelectedCategories.length === 0 || (lot.category && lowerOtherCategories.includes(lot.category.toLowerCase()))) &&
          (!currentSearchTerm || ( // Проверка поискового запроса
            (lot.title && lot.title.toLowerCase().includes(lowerSearchTerm)) ||
            (lot.number !== undefined && lot.number !== null && String(lot.number).toLowerCase().includes(lowerSearchTerm)) // Проверка номера лота
          ));

        // Если лот соответствует другим критериям, увеличиваем счетчик для его значения фильтра
        if (matchesOtherCriteria) {
          counts[valueAsString] = (counts[valueAsString] || 0) + 1;
        }
      }
    });

    // Преобразуем уникальные значения в массив { name, count }, включая элементы с count 0
    return Array.from(uniqueNames).map(name => ({
      name,
      count: counts[name] || 0 // Если count не найден, значит 0
    })).sort((a, b) => a.name.localeCompare(b.name)); // Сортируем по имени
  };

  // Подсчет количества лотов для каждой локации (с учетом фильтров событий, категорий и поиска)
  const locationCounts = useMemo(() => {
    return getFilterCounts('city', selectedLocations, selectedLocations, selectedEvents, selectedCategories, searchTerm);
  }, [allLots, selectedLocations, selectedEvents, selectedCategories, searchTerm]); // Зависит от всех фильтров и поиска

  // Подсчет количества лотов для каждого события (с учетом фильтров локаций, категорий и поиска)
  const eventCounts = useMemo(() => {
    return getFilterCounts('event', selectedEvents, selectedLocations, selectedEvents, selectedCategories, searchTerm);
  }, [allLots, selectedLocations, selectedEvents, selectedCategories, searchTerm]); // Зависит от всех фильтров и поиска

  // Подсчет количества лотов для каждой категории (с учетом фильтров локаций, событий и поиска)
  const categoryCounts = useMemo(() => {
    return getFilterCounts('category', selectedCategories, selectedLocations, selectedEvents, selectedCategories, searchTerm);
  }, [allLots, selectedLocations, selectedEvents, selectedCategories, searchTerm]); // Зависит от всех фильтров и поиска

  // ПЕРЕРАСЧЕТ HASFILTERS
  // Определяем, есть ли хоть один активный фильтр или поисковый запрос
  const hasFilters =
    selectedLocations.length > 0 ||
    selectedEvents.length > 0 ||
    selectedCategories.length > 0 ||
    searchTerm !== '';


  // ФУНКЦИЯ ДЛЯ ПЕРЕКЛЮЧЕНИЯ ФИЛЬТРА (добавить/удалить из выбранных)
  const toggleFilter = (filter: string, type: 'location' | 'event' | 'category') => {
    switch (type) {
      case 'location':
        dispatch(toggleLocationFilter(filter)); // Диспатчим экшен для локаций
        break;
      case 'event':
        dispatch(toggleEventFilter(filter)); // Диспатчим экшен для событий
        break;
      case 'category':
        dispatch(toggleCategoryFilter(filter)); // Диспатчим экшен для категорий
        break;
    }
  };


  // ФУНКЦИЯ ДЛЯ ОЧИСТКИ ВСЕХ ФИЛЬТРОВ И ПОИСКА
  const clearFilters = () => {
    dispatch(setFilters({ locations: [], events: [], categories: [] })); // Сбрасываем выбранные фильтры в Redux
    dispatch(setSearchTerm('')); // Сбрасываем поисковый запрос в Redux
  };

  // Вспомогательная функция для рендеринга одной секции фильтров (Локация, Событие, Категория)
  const renderFilterSection = (
    title: string, // Заголовок секции
    items: FilterType[], // Список элементов фильтра ({ name, count })
    selectedItems: string[], // Список выбранных элементов (из Redux)
    isOpen: boolean, // Открыта ли секция UI
    toggleOpen: () => void, // Функция для переключения открытия/закрытия UI
    onChange: (name: string, type: 'location' | 'event' | 'category') => void, // Функция, вызываемая при клике на чекбокс
    filterType: 'location' | 'event' | 'category' // Тип фильтра для передачи в onChange
  ) => (
    // Обертка секции фильтра с верхней/нижней границей
    <div className={styles.filterWrapper}>
      {/* Заголовок секции, который можно кликнуть для сворачивания/разворачивания */}
      <div className={styles.sectionWrapper} onClick={toggleOpen}>
        <span className={styles.sectionTitle}>{title}</span>
        {/* Иконка развернуть/свернуть */}
        <img
          src={isOpen ? ExpendedIcon : CollectedIcon}
          alt={`Toggle ${title}`}
          className={styles.sortIcon} // Используем тот же стиль для иконки
        />
      </div>
      {/* Выпадающий список элементов фильтра (показывается только если isOpen === true) */}
      {isOpen && (
        <ul className={styles.sortDropdown}> {/* Используем тот же стиль, что и для сортировки */}
          {/* ИТЕРИРУЕМ ПО ВСЕМ ЭЛЕМЕНТАМ ИЗ СПИСКА items */}
          {items.map((item) => (
              <li key={item.name} className={styles.sortOption}> {/* Используем стиль опции сортировки */}
                {/* Чекбокс и лейбл для элемента фильтра */}
                <label className={styles.checkboxItem}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={selectedItems.includes(item.name)} // Чекбокс отмечен, если элемент в списке выбранных
                    onChange={() => onChange(item.name, filterType)} // При изменении вызываем toggleFilter
                  />
                  {/* Имя элемента фильтра и количество лотов */}
                  <div className={styles.filterItem}>
                    <span>{item.name}</span>
                    {/* Отображаем количество только если оно > 0 */}
                    {item.count > 0 && <span className={styles.itemCount}>{item.count}</span>}
                  </div>
                </label>
              </li>
            ))}
        </ul>
      )}
    </div>
  );

  // Условный рендеринг содержимого InformationAddition
  return (
    <div className={styles.informationAddition}>
      {/* Если это страница избранного, показываем только контакты */}
      {isFavoritePage ? (
        <Contacts />
      ) : (
        // Если это НЕ страница избранного (главная страница), показываем фильтры, сортировку, информацию и контакты
        <>
          {/* Аккордеон для мобильных устройств */}
          <div className={styles.mobileAccordion} onClick={() => setShowFiltersMobile((prev) => !prev)}>
            <span>ИНФОРМАЦИЯ И ДОПОЛНЕНИЕ</span>
            {/* Иконка аккордеона (белая) */}
            <img
              src={showFiltersMobile ? ExpendedWhiteIcon : CollectedWhiteIcon}
              alt="Toggle"
              className={styles.mobileAccordionIcon}
            />
          </div>

          {/* Содержимое блока (скрывается на мобильных при showFiltersMobile === false) */}
          {showFiltersMobile && (
            <div className={styles.backColor}> {/* Фоновый цвет для содержимого на мобильных */}
              {/* Заголовок секции фильтрации и кнопка очистки */}
              <div className={styles.filterHeader}>
                <div className={styles.filterTitleRow}>
                  <div className={styles.filterTitle}>ФИЛЬТРАЦИЯ</div>
                  {/* Иконка галочки, если есть активные фильтры */}
                  {hasFilters && (
                    <img src={CheckmarkIcon} alt="Checkmark" className={styles.filterIcon} />
                  )}
                </div>
                {/* Кнопка "Очистить фильтр" (активна, если есть активные фильтры) */}
                <div
                  className={`${styles.clearFilter} ${hasFilters ? styles.active : ''}`}
                  onClick={clearFilters} // При клике очищаем фильтры
                >
                  ОЧИСТИТЬ ФИЛЬТР
                </div>
              </div>

              {/* СЕКЦИЯ СОРТИРОВКИ */}
              <div
                className={styles.sectionWrapper}
                onClick={() => setSortDropdownOpen((prev) => !prev)} // Переключаем видимость выпадающего списка сортировки
              >
                <span className={styles.sectionTitle}>СОРТИРОВКА</span>
                {/* Иконка развернуть/свернуть */}
                <img
                  src={sortDropdownOpen ? ExpendedIcon : CollectedIcon}
                  alt="Toggle Sort"
                  className={styles.sortIcon}
                />
              </div>
              {/* Выпадающий список опций сортировки */}
              {sortDropdownOpen && (
                <ul className={styles.sortDropdown}>
                  {sortOptions.map((option) => (
                    <li
                      key={option.value}
                      // Активный стиль, если опция выбрана
                      className={`${styles.sortOption} ${
                        selectedSort === option.value ? styles.activeOption : ''
                      }`}
                      onClick={() => {
                        dispatch(setSortOption(option.value)); // Диспатчим экшен для установки опции сортировки
                        setSortDropdownOpen(false); // Закрываем выпадающий список
                      }}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              )}

              {/* СЕКЦИИ ФИЛЬТРОВ (ЛОКАЦИЯ, СОБЫТИЕ, КАТЕГОРИЯ) */}
              {locationCounts.length > 0 && renderFilterSection(
                'ЛОКАЦИЯ',
                locationCounts, // <-- Передаем список с полным набором и правильными счетчиками
                selectedLocations, // Выбранные локации из Redux
                locationDropdownOpen, // Состояние открытия/закрытия UI
                () => setLocationDropdownOpen((prev) => !prev), // Функция для переключения UI
                toggleFilter, // Функция для обработки клика по чекбоксу
                'location' // Тип фильтра
              )}

              {eventCounts.length > 0 && renderFilterSection(
                'СОБЫТИЕ',
                eventCounts,
                selectedEvents,
                eventDropdownOpen,
                () => setEventDropdownOpen((prev) => !prev),
                toggleFilter,
                'event'
              )}

              {categoryCounts.length > 0 && renderFilterSection(
                'КАТЕГОРИЯ',
                categoryCounts,
                selectedCategories,
                categoryDropdownOpen,
                () => setCategoryDropdownOpen((prev) => !prev),
                toggleFilter,
                'category'
              )}

              {/* СЕКЦИЯ ИНФОРМАЦИИ ОБ АУКЦИОНЕ */}
              <div className={styles.filterWrapper}> {/* Обертка с границами */}
                {/* Заголовок секции информации */}
                <div
                  className={styles.sectionWrapper}
                  onClick={() => setInfoDropdownOpen((prev) => !prev)} // Переключаем видимость информации
                >
                  <span className={styles.infoHeader}>ИНФОРМАЦИЯ</span>
                  {/* Иконка развернуть/свернуть */}
                  <img
                    src={infoDropdownOpen ? ExpendedIcon : CollectedIcon}
                    alt="Toggle Info"
                    className={styles.sortIcon}
                  />
                </div>
                {/* Содержимое секции информации (показывается, если infoDropdownOpen === true) */}
                {infoDropdownOpen && (
                  <div className={styles.infoSection}>
                    {/* Список с датой аукциона */}
                    <ul className={styles.infoList}>
                      <li className={styles.infoListItem}>
                        <span className={styles.auctionDate}>
                          <img src={CalendarIcon} alt="" className={styles.icon} />
                          ДАТА АУКЦИОНА
                        </span>
                        <span className={styles.dateRange}>10 – 13 ЯНВАРЯ</span>
                      </li>
                    </ul>
                    {/* Время продаж (Утро, Вечер) */}
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

              {/* !!! СЕКЦИЯ РЕГИСТРАЦИИ / ЛИЧНОГО КАБИНЕТА (зависит от авторизации) !!! */}
              <div className={styles.infoSection}>
                {isAuthenticated ? (
                  // Если пользователь авторизован - показываем ссылку на Личный кабинет
                  <>
                    <h3 className={styles.registrationHeader}>ЛИЧНЫЙ КАБИНЕТ</h3>
                    <p className={styles.infoText}>Управляйте вашим профилем, историей покупок и избранными лотами.</p>
                    {/* Кнопка "Перейти в кабинет" */}
                    <button onClick={() => navigate(routes.personalAccount)} className={styles.registerButton}>
                      Перейти в кабинет
                    </button>
                  </>
                ) : (
                  // Если пользователь НЕ авторизован - показываем информацию о регистрации
                  <>
                    <h3 className={styles.registrationHeader}>РЕГИСТРАЦИЯ ОТКРЫТА</h3>
                    <p className={styles.infoText}>
                      Зарегистрируйтесь сейчас, чтобы делать предварительные ставки или делать ставки в
                      реальном времени в нашем цифровом зале продаж.
                    </p>
                    {/* Кнопка "Зарегистрироваться" (открывает модалку регистрации) */}
                    <button onClick={() => open('register')} className={styles.registerButton}>
                      Зарегистрироваться
                    </button>
                  </>
                )}
              </div>

              {/* Секция контактов */}
              <Contacts />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default InformationAddition;