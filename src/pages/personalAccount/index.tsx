// src/pages/personalAccount/index.tsx
import React, { useRef, useState } from 'react'; // Импорт хуков React (useRef, useState)
import Header from '../../widgets/header';
import Footer from '../../widgets/footer';
import PersonalData from '../../components/PersonalData';
import PurchaseHistory from '../../components/PurchaseHistory';

import PersonIcon from '../../icons/personal.svg';
import PersonWhiteIcon from '../../icons/personalWhite.svg';
import HistoryIcon from '../../icons/history.svg';
import HistoryWhiteIcon from '../../icons/historyWhite.svg';


// Компонент страницы "Личный кабинет"
const PersonalAccountPage: React.FC = () => {
  // Реф для поля поиска в хедере
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Состояние для определения, какая секция данных сейчас отображается: 'history' или 'data'.
  // По умолчанию отображается история покупок.
  const [selectedSection, setSelectedSection] = useState<'history' | 'data'>('history');

  // Рендеринг страницы
  return (
    <div className={"pageLayout"}> {/* Основной контейнер макета страницы */}
      {/* Отображаем хедер, передавая реф для поиска */}
      <Header searchInputRef={searchInputRef} />
      <main className="main"> {/* Основная область контента */}
        {/* Контейнер для расположения выбранной секции данных и кнопок переключения */}
        {/* Используется тот же класс, что и для сетки лотов/сайдбара, возможно для общего макета страницы */}
        <div className="auctionContainer">

          {/* Условный рендеринг: отображаем компонент истории покупок, если выбрана секция 'history' */}
          {selectedSection === 'history' && <PurchaseHistory />}
          {/* Условный рендеринг: отображаем компонент персональных данных, если выбрана секция 'data' */}
          {selectedSection === 'data' && <PersonalData />}

          {/* Блок с кнопками для переключения между секциями */}
          <div className="sectionToggle">
            {/* Кнопка "Персональные данные" */}
            <div
              className={`toggleButton ${selectedSection === 'data' ? "active" : ''}`} // Активный класс, если выбрана эта секция
              onClick={() => setSelectedSection('data')}> {/* При клике меняем выбранную секцию */}
              {/* Иконка меняется в зависимости от того, активна ли кнопка */}
              <img src={selectedSection === 'data' ? PersonWhiteIcon : PersonIcon}
                   alt="Персональные данные" className="icon" />
              Персональные данные
            </div>
            {/* Кнопка "История покупок" */}
            <div
              className={`toggleButton ${selectedSection === 'history' ? "active" : ''}`} // Активный класс, если выбрана эта секция
              onClick={() => setSelectedSection('history')}> {/* При клике меняем выбранную секцию */}
              {/* Иконка меняется в зависимости от того, активна ли кнопка */}
              <img src={selectedSection === 'history' ? HistoryWhiteIcon : HistoryIcon}
                   alt="История покупок" className="icon" />
              История покупок
            </div>
          </div>
        </div>
      </main>
      {/* Отображаем футер */}
      <Footer />
    </div>
  );
};

export default PersonalAccountPage;