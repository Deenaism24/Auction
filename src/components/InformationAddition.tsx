import React, { useState, useEffect, forwardRef } from 'react';
import * as styles from './InformationAddition.module.css';
import Search from './Search';
import CollectedIcon from '../icons/collected.svg';
import ExpendedIcon from '../icons/expended.svg';
import CollectedWhiteIcon from '../icons/collectedWhite.svg';
import ExpendedWhiteIcon from '../icons/expendedWhite.svg';
import PhoneIcon from '../icons/phone.svg';
import MailIcon from '../icons/mail.svg';
import CalendarIcon from '../icons/calendar.svg';
import CheckmarkIcon from '../icons/checkmark.svg';
import { useAuthModal } from '../contexts/AuthFlowModalContext';

interface FilterType {
  name: string;
  count: number;
}

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
  { label: 'По названию (А-Я)', value: 'name-asc' },
  { label: 'По названию (Я-А)', value: 'name-desc' },
  { label: 'По городу (А-Я)', value: 'city-asc' },
  { label: 'По городу (Я-А)', value: 'city-desc' },
  { label: 'По возрастанию стартовой стоимости', value: 'price-asc' },
  { label: 'По убыванию стартовой стоимости', value: 'price-desc' },
];

const InformationAddition = forwardRef<HTMLInputElement, { forwardedRef?: React.RefObject<HTMLInputElement> }>(
  ({ forwardedRef }, ref) => {
    const { open } = useAuthModal();
    const [showFiltersMobile, setShowFiltersMobile] = useState(true);
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
    const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
    const [eventDropdownOpen, setEventDropdownOpen] = useState(false);
    const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState('name-asc');
    const [infoDropdownOpen, setInfoDropdownOpen] = useState(true);

    useEffect(() => {
      const handleResize = () => {
        setShowFiltersMobile(window.innerWidth >= 1260);
      };

      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleFilter = (
      filter: string,
      currentFilters: string[],
      setFilters: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
      setFilters(
        currentFilters.includes(filter)
          ? currentFilters.filter((f) => f !== filter)
          : [...currentFilters, filter]
      );
    };

    const clearFilters = () => {
      setSelectedLocations([]);
      setSelectedEvents([]);
      setSelectedCategories([]);
    };

    const hasFilters =
      selectedLocations.length > 0 || selectedEvents.length > 0 || selectedCategories.length > 0;

    const renderFilterSection = (
      title: string,
      items: FilterType[],
      selectedItems: string[],
      isOpen: boolean,
      toggleOpen: () => void,
      onChange: (name: string) => void
    ) => (
      <div className={ styles.filterWrapper }>
        <div className={ styles.sectionWrapper } onClick={toggleOpen}>
          <span className={ styles.sectionTitle }>{title}</span>
          <img
            src={isOpen ? ExpendedIcon : CollectedIcon}
            alt={`Toggle ${title}`}
            className={ styles.sortIcon }
          />
        </div>
        {isOpen && (
          <ul className={ styles.sortDropdown }>
            {items.map((item) => (
              <li key={item.name} className={ styles.sortOption }>
                <label className={ styles.checkboxItem }>
                  <input
                    type="checkbox"
                    className={ styles.checkbox }
                    checked={selectedItems.includes(item.name)}
                    onChange={() => onChange(item.name)}
                  />
                  <div className={ styles.filterItem }>
                    <span>{item.name}</span>
                    <span className={ styles.itemCount }>{item.count}</span>
                  </div>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
    );

    return (
      <div className={styles.informationAddition}>
        <div id="search-section">
          <Search ref={ref} />
        </div>
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
            {/*<div className={styles.topWrapper}>*/}
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
                        setSelectedSort(option.value);
                        setSortDropdownOpen(false);
                      }}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              )}

              {renderFilterSection(
                'ЛОКАЦИЯ',
                locations,
                selectedLocations,
                locationDropdownOpen,
                () => setLocationDropdownOpen((prev) => !prev),
                (name) => toggleFilter(name, selectedLocations, setSelectedLocations)
              )}

              {renderFilterSection(
                'СОБЫТИЕ',
                events,
                selectedEvents,
                eventDropdownOpen,
                () => setEventDropdownOpen((prev) => !prev),
                (name) => toggleFilter(name, selectedEvents, setSelectedEvents)
              )}

              {renderFilterSection(
                'КАТЕГОРИЯ',
                categories,
                selectedCategories,
                categoryDropdownOpen,
                () => setCategoryDropdownOpen((prev) => !prev),
                (name) => toggleFilter(name, selectedCategories, setSelectedCategories)
              )}

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

            <div className={styles.infoSection}>
              <div className={styles.contactInfo}>
                <div className={styles.contactHeader}>Контакты со специалистом</div>

                <div className={styles.contactItem}>
                  <div className={styles.contactLine}>
                    <img src={PhoneIcon} alt="PHONE" className={styles.icon} />
                    <span>+44 20 7318 4024</span>
                  </div>
                  <div className={styles.contactLine}>
                    <img src={MailIcon} alt="MAIL" className={styles.contactIcon} />
                    <a href="mailto:EditionsLondon@Phillips.com" className={styles.contactLink}>
                      EditionsLondon@Phillips.com
                    </a>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.contactName}>Rebecca Tooby</div>
                  <div className={styles.contactTitle}>
                    DesmondSpecialist, Head of Sale, EditionsTooby
                  </div>
                  <div className={styles.contactLine}>
                    <img src={MailIcon} alt="MAIL" className={styles.contactIcon} />
                    <a href="mailto:desmond@phillips.com" className={styles.contactLink}>
                      desmond@phillips.com
                    </a>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.contactName}>Robert Kennan</div>
                  <div className={styles.contactTitle}>Head of Editions, Europe</div>
                  <div className={styles.contactLine}>
                    <img src={MailIcon} alt="MAIL" className={styles.contactIcon} />
                    <a href="mailto:rkennan@phillips.com" className={styles.contactLink}>
                      rkennan@phillips.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default InformationAddition;