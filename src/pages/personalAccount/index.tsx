// src/pages/personalAccount/index.tsx
import React, { useRef, useState } from 'react'; // useRef все еще нужен для Header, даже если нет поиска на этой странице
import Header from '../../widgets/header';
import Footer from '../../widgets/footer';
import PersonalData from '../../components/PersonalData'; // Компонент для персональных данных
import PurchaseHistory from '../../components/PurchaseHistory'; // Компонент для истории покупок
import * as personalDataStyles from '../../components/PersonalData.module.css'; // Используем алиас, чтобы не конфликтовать со стилями контента


const PersonalAccountPage: React.FC = () => {
  // searchInputRef все еще передается в Header, даже если Search не рендерится на этой странице
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [selectedSection, setSelectedSection] = useState<'history' | 'data'>('history'); // По умолчанию - история покупок

  return (
    <>
      {/* Header ожидает searchInputRef */}
      <Header searchInputRef={searchInputRef} />
      <main className="main"> {/* Используем общий класс main */}
        {/* auctionContainer - это ваш общий контейнер для макета.
            Предполагаем, что он создает две колонки: одна основная (для сетки лотов на главной)
            и одна для сайдбара (для фильтров/информации на главной).
            На этой странице мы будем использовать ТОЛЬКО колонку сайдбара для всего контента ЛК.
            Левая колонка останется пустой или будет невидимой в зависимости от CSS auctionContainer.
        */}
        <div className="auctionContainer">
          {/* Левая колонка - на странице ЛК она пустая */}
          <div className="mainContentColumn"> {/* Предполагаем, что у вас есть такой класс для левой колонки */}
            {/* Этот div просто занимает место левой колонки в двухколоночном макете */ }
            {/* Его стили (ширина, отступы) должны быть определены в вашем общем CSS для макета */}
          </div>

          {/* Правая колонка - здесь размещаем переключатель и контент ЛК */}
          {/* Используем тот же класс сайдбара, что и на главной для консистентности */}
          <div className="sidebarContainer">
            {/* Блок выбора секции */}
            <div className={personalDataStyles.sectionToggle}> {/* Используем стили из PersonalData.module.css */}
              <button
                // !!! ИСПРАВЛЕНО: правильное использование классов стилей !!!
                className={`${personalDataStyles.toggleButton} ${selectedSection === 'history' ? personalDataStyles.active : ''}`}
                onClick={() => setSelectedSection('history')}
              >
                История покупок
              </button>
              <button
                // !!! ИСПРАВЛЕНО: правильное использование классов стилей !!!
                className={`${personalDataStyles.toggleButton} ${selectedSection === 'data' ? personalDataStyles.active : ''}`}
                onClick={() => setSelectedSection('data')}
              >
                Персональные данные
              </button>
            </div>

            {/* Блок для рендеринга контента секции */}
            {/* Не нужен отдельный div. Компоненты PurchaseHistory и PersonalData уже содержат свои секции. */}
            {/* {selectedSection === 'history' ? (
                <PurchaseHistory />
              ) : (
                <PersonalData />
              )} */}

            {/* Рендерим нужный компонент напрямую */}
            {selectedSection === 'history' && <PurchaseHistory />}
            {selectedSection === 'data' && <PersonalData />}

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PersonalAccountPage;