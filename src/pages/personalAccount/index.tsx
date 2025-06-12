// src/pages/personalAccount/index.tsx
import React, { useRef, useState } from 'react'; // useRef все еще нужен для Header, даже если нет поиска на этой странице
import Header from '../../widgets/header';
import Footer from '../../widgets/footer';
import PersonalData from '../../components/PersonalData'; // Компонент для персональных данных
import PurchaseHistory from '../../components/PurchaseHistory';
import PersonIcon from '../../icons/personal.svg';
import PersonWhiteIcon from '../../icons/personalWhite.svg';
import HistoryIcon from '../../icons/history.svg';
import HistoryWhiteIcon from '../../icons/historyWhite.svg';
import * as styles from '../../widgets/header/Header.module.css'; // Компонент для истории покупок


const PersonalAccountPage: React.FC = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [selectedSection, setSelectedSection] = useState<'history' | 'data'>('history'); // По умолчанию - история покупок

  return (
    <div className={"pageLayout"}>
      <Header searchInputRef={searchInputRef} />
      <main className="main">
        <div className="auctionContainer">
          <div className="sidebarContainer">
            <div className={`$"toggleButton" ${selectedSection === 'data' ? "active" : ''}`}
                 onClick={() => setSelectedSection('data')}>
              <img src={selectedSection === 'data' ? PersonWhiteIcon : PersonIcon}
                   alt="Персональные данные" className={styles.icon} />
              Персональные данные
            </div>
            <div className={`$"toggleButton" ${selectedSection === 'history' ? "active" : ''}`}
                 onClick={() => setSelectedSection('history')}>
              <img src={selectedSection === 'history' ? HistoryWhiteIcon : HistoryIcon}
                   alt="История покупок" className={styles.icon} />
              История покупок
            </div>
          </div>

          {selectedSection === 'history' && <PurchaseHistory />}
          {selectedSection === 'data' && <PersonalData />}

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PersonalAccountPage;