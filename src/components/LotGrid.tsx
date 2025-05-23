import React, { useState } from 'react';
import * as styles from './LotGrid.module.css';
import { generatePath, NavLink } from 'react-router';
import { routes } from '../routes';
import CalendarIcon from '../icons/calendar.svg';
import MagnifierIcon from '../icons/magnifier.svg';
import BackPageAIcon from '../icons/backpageA.svg';
import BackPageDIcon from '../icons/backpageD.svg';
import NextPageAIcon from '../icons/nextpageA.svg';
import NextPageDIcon from '../icons/nextpageD.svg';
import DollarIcon from '../icons/dollar.svg';
import lots from '../default';
import { useZoomPhotoModal } from '../contexts/ZoomPhotoModalContext';

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

  const { open } = useZoomPhotoModal();
  const openImagePopup = (imageUrl: string) => {
    open(imageUrl);
  };

  return (
    <section className={styles.lotSection}>
      <div className={styles.gridHeader}>
        <div className={styles.h2}>Аукцион картин автора</div>
        <div className={styles.subHeader}>
          <div className={styles.auctionDate}>
            <img src={CalendarIcon} alt="ДАТА АУКЦИОНА" />
            ДАТА АУКЦИОНА
          </div>
          <div className={styles.dateRange}>10–13 ЯНВАРЯ</div>
        </div>
      </div>

      <div className={styles.grid}>
        {currentLots.map((lot) => (
          <div key={lot.id} className={styles.card}>
            <div className={styles.imageWrapper} onClick={() => openImagePopup(lot.image)}>
              <img src={lot.image} alt={lot.title} className={styles.image} />
              <img src={MagnifierIcon} alt="Посмотреть" className={styles.magnifier} />
            </div>
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
        ))}
      </div>

      <div className={styles.pagination}>
        <button
          className={`${styles.pageBtn} ${currentPage === 1 ? styles.disabled : ''}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <img src={currentPage === 1 ? BackPageAIcon : BackPageDIcon} alt="Назад" />
          <div className={`${styles.pageBtn} ${currentPage === 1 ? styles.disabled : ''}`}>
            Назад
          </div>
        </button>

        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              className={`${styles.pageNum} ${currentPage === page ? styles.active : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          );
        })}

        <button
          className={`${styles.pageBtn} ${currentPage === totalPages ? styles.disabled : ''}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <div className={`${styles.pageBtn} ${currentPage === totalPages ? styles.disabled : ''}`}>
            Вперед
          </div>
          <img src={currentPage === totalPages ? NextPageAIcon : NextPageDIcon} alt="Вперед" />
        </button>
      </div>
    </section>
  );
};

export default LotGrid;