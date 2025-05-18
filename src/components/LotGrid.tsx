import React, { useState } from 'react';
import './LotGrid.css';
import { generatePath, NavLink } from 'react-router';
import {routes} from '../routes'
import CalendarIcon from '../icons/calendar.svg';
import MagnifierIcon from '../icons/magnifier.svg';
import BackPageAIcon from '../icons/backpageA.svg';
import BackPageDIcon from '../icons/backpageD.svg';
import NextPageAIcon from '../icons/nextpageA.svg';
import NextPageDIcon from '../icons/nextpageD.svg';
import DollarIcon from '../icons/dollar.svg';
import lots from '../default'

// Переход на страницу лота при нажатии на него???
function getWindowWidth() {
  return window.innerWidth;
}

const LotGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth] = React.useState(getWindowWidth());
  const lotsPerPage = windowWidth >= 600 ? 9 : 4;

  const totalPages = Math.ceil(lots.length / lotsPerPage);
  const startIndex = (currentPage - 1) * lotsPerPage;
  const currentLots = lots.slice(startIndex, startIndex + lotsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className='lotSection'>
      <div className='gridHeader'>
        <div className='h2'>Аукцион картин автора</div>
        <div className='subHeader'>
          <div className='auctionDate'>
            <img src={CalendarIcon} alt="ДАТА АУКЦИОНА" />
            ДАТА АУКЦИОНА
          </div>
          <div className='dateRange'>10–13 ЯНВАРЯ</div>
        </div>
      </div>

      <div className='grid'>
        {currentLots.map((lot) => (
          <div key={lot.id} className='card'>
            <NavLink to={generatePath(routes.photo, { photo: lot.number })} className='imageWrapper'>
              <div >
                <img src={lot.image} alt={lot.title} className='image' />
                <img src={MagnifierIcon} alt="Посмотреть" className='magnifier' />
              </div>
            </NavLink>
            <NavLink to={generatePath(routes.openLot, { lot: lot.number })} className='info'>
              <div className='info'>
                <div className='numberRow'>
                  <span className='label'>НОМЕР ЛОТА:</span>
                  <span className='numberValue'>{lot.number}</span>
                </div>
                <div className='lotName'>
                  {lot.title}
                </div>
                <div className='priceBlock'>
                  <div className='priceLabel'>
                    <img src={DollarIcon} alt="Цена" />
                    СТАРТОВАЯ ЦЕНА
                  </div>
                  <div className='priceValue'>{lot.price}</div>
                </div>
              </div>
            </NavLink>
          </div>
        ))}
      </div>

      <div className='pagination'>
        <button
          className={`pageBtn ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <img src={currentPage === 1 ? BackPageAIcon : BackPageDIcon} alt="Назад" />
          <div className={`pageBtn ${currentPage === 1 ? 'disabled' : ''}`}>
            Назад
          </div>
        </button>

        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              className={`pageNum ${currentPage === page ? 'active' : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          );
        })}

        <button
          className={`pageBtn ${currentPage === totalPages ? 'disabled' : ''}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <div className={`pageBtn ${currentPage === totalPages ? 'disabled' : ''}`}>
            Вперед
          </div>
          <img src={currentPage === totalPages ? NextPageAIcon : NextPageDIcon} alt="Вперед" />
        </button>
      </div>
    </section>
  );
};

export default LotGrid;
