import React, { useState, useEffect, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import './InformationAddition.css';
import Search from './Search';
import CollectedIcon from '../icons/collected.svg';
import ExpendedIcon from '../icons/expended.svg';
import CollectedWhiteIcon from '../icons/collectedWhite.svg';
import ExpendedWhiteIcon from '../icons/expendedWhite.svg';
import PhoneIcon from '../icons/phone.svg';
import MailIcon from '../icons/mail.svg';
import CalendarIcon from '../icons/calendar.svg';
import CheckmarkIcon from '../icons/checkmark.svg';
import { routes } from '../routes';

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

interface InformationAdditionProps {
  forwardedRef?: React.RefObject<HTMLInputElement>;
}

const InformationAddition = forwardRef<HTMLInputElement, InformationAdditionProps>(
  (props, ref) => {
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
      <div className='filterWrapper'>
        <div className='sectionWrapper' onClick={toggleOpen}>
          <span className='sectionTitle'>{title}</span>
          <img
            src={isOpen ? ExpendedIcon : CollectedIcon}
            alt={`Toggle ${title}`}
            className='sortIcon'
          />
        </div>
        {isOpen && (
          <ul className='sortDropdown'>
            {items.map((item) => (
              <li key={item.name} className='sortOption'>
                <label className='checkboxItem'>
                  <input
                    type="checkbox"
                    className='checkbox'
                    checked={selectedItems.includes(item.name)}
                    onChange={() => onChange(item.name)}
                  />
                  <div className='filterItem'>
                    <span>{item.name}</span>
                    <span className='itemCount'>{item.count}</span>
                  </div>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
    );

    return (
      <div className="informationAddition">
        <div id='search-section'>
          <Search ref={ref} />
        </div>
        <div className='mobileAccordion' onClick={() => setShowFiltersMobile((prev) => !prev)}>
          <span>ИНФОРМАЦИЯ И ДОПОЛНЕНИЕ</span>
          <img
            src={showFiltersMobile ? ExpendedWhiteIcon : CollectedWhiteIcon}
            alt="Toggle"
            className='mobileAccordionIcon'
          />
        </div>

        {showFiltersMobile && (
          <div className='backColor'>
            <div className='topWrapper'>
              <div className='filterHeader'>
                <div className='filterTitleRow'>
                  <div className='filterTitle'>ФИЛЬТРАЦИЯ</div>
                  {hasFilters && (
                    <img src={CheckmarkIcon} alt="Checkmark" className='filterIcon' />
                  )}
                </div>
                <div
                  className={`clearFilter ${hasFilters ? 'active' : ''}`}
                  onClick={clearFilters}
                >
                  ОЧИСТИТЬ ФИЛЬТР
                </div>
              </div>

              <div
                className='sectionWrapper'
                onClick={() => setSortDropdownOpen((prev) => !prev)}
              >
                <span className='sectionTitle'>СОРТИРОВКА</span>
                <img
                  src={sortDropdownOpen ? ExpendedIcon : CollectedIcon}
                  alt="Toggle Sort"
                  className='sortIcon'
                />
              </div>
              {sortDropdownOpen && (
                <ul className='sortDropdown'>
                  {sortOptions.map((option) => (
                    <li
                      key={option.value}
                      className={`sortOption ${selectedSort === option.value ? 'activeOption' : ''}`}
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
            </div>

            <div className='filterWrapper'>
              <div
                className='sectionWrapper'
                onClick={() => setInfoDropdownOpen((prev) => !prev)}
              >
                <span className='infoHeader'>ИНФОРМАЦИЯ</span>
                <img
                  src={infoDropdownOpen ? ExpendedIcon : CollectedIcon}
                  alt="Toggle Info"
                  className='sortIcon'
                />
              </div>
              {infoDropdownOpen && (
                <div className='infoSection'>
                  <ul className='infoList'>
                    <li className='infoListItem'>
                    <span className='auctionDate'>
                      <img src={CalendarIcon} alt="" className='icon' />
                      ДАТА АУКЦИОНА
                    </span>
                      <span className='dateRange'>10 – 13 ЯНВАРЯ</span>
                    </li>
                  </ul>

                  <div className='infoHighlight'>
                    <div className='infoCeilTitle'>УТРО ПРОДАЖ</div>
                    <div>10–11 Января 6:00</div>
                    <div>Лоты (1–24)</div>
                  </div>

                  <div className='infoHighlight'>
                    <div className='infoCeilTitle'>ВЕЧЕР ПРОДАЖ</div>
                    <div>13 Января 18:00</div>
                    <div>Лоты (25–31)</div>
                  </div>
                </div>
              )}
            </div>

            <div className='infoSection'>
              <h3 className='registrationHeader'>РЕГИСТРАЦИЯ ОТКРЫТА</h3>
              <p className='infoText'>
                Зарегистрируйтесь сейчас, чтобы делать предварительные ставки или делать ставки в
                реальном времени в нашем цифровом зале продаж.
              </p>
              <Link to={routes.auth} className='registerButton'>
                Зарегистрироваться
              </Link>
            </div>

            <div className='infoSection'>
              <div className='contactInfo'>
                <div className='contactHeader'>Контакты со специалистом</div>

                <div className='contactItem'>
                  <div className='contactLine'>
                    <img src={PhoneIcon} alt="PHONE" className='icon' />
                    <span>+44 20 7318 4024</span>
                  </div>
                  <div className='contactLine'>
                    <img src={MailIcon} alt="MAIL" className='contactIcon' />
                    <a href="mailto:EditionsLondon@Phillips.com" className='contactLink'>
                      EditionsLondon@Phillips.com
                    </a>
                  </div>
                </div>

                <div className='contactItem'>
                  <div className='contactName'>Rebecca Tooby</div>
                  <div className='contactTitle'>
                    DesmondSpecialist, Head of Sale, EditionsTooby
                  </div>
                  <div className='contactLine'>
                    <img src={MailIcon} alt="MAIL" className='contactIcon' />
                    <a href="mailto:desmond@phillips.com" className='contactLink'>
                      desmond@phillips.com
                    </a>
                  </div>
                </div>

                <div className='contactItem'>
                  <div className='contactName'>Robert Kennan</div>
                  <div className='contactTitle'>Head of Editions, Europe</div>
                  <div className='contactLine'>
                    <img src={MailIcon} alt="MAIL" className='contactIcon' />
                    <a href="mailto:rkennan@phillips.com" className='contactLink'>
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

// InformationAddition.displayName = 'InformationAddition';

export default InformationAddition;