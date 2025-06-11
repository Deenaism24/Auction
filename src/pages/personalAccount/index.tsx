// src/pages/personalAccount/index.tsx
import React, { useRef, useState } from 'react';
import Header from '../../widgets/header';
import Footer from '../../widgets/footer';
import PersonalData from '../../components/PersonalData'; // Компонент для персональных данных
import PurchaseHistory from '../../components/PurchaseHistory'; // Компонент для истории покупок


const PersonalAccountPage: React.FC = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [selectedSection, setSelectedSection] = useState<'history' | 'data'>('history'); // По умолчанию - история покупок

  return (
    <>
      <Header searchInputRef={searchInputRef} /> {/* Передайте searchInputRef если Header требует его */}
      <main className="main"> {/* Используем общий класс main */}
        <div className="accountContainer"> {/* Контейнер для макета личного кабинета */}
          <div className="leftColumn"> {/* Левая колонка (заголовок) */}
            <h1 className="accountTitle">Личный кабинет</h1>
          </div>

          <div className="rightColumn"> {/* Правая колонка (выбор секции и контент) */}
            <div className="sectionToggle"> {/* Блок выбора секции */}
              <button
                className={`$"toggleButton" ${selectedSection === 'history' ? "active" : ''}`}
                onClick={() => setSelectedSection('history')}
              >
                История покупок
              </button>
              <button
                className={`$"toggleButton" ${selectedSection === 'data' ? "active" : ''}`}
                onClick={() => setSelectedSection('data')}
              >
                Персональные данные
              </button>
            </div>

            <div className="sectionContent"> {/* Блок для рендеринга контента секции */}
              {selectedSection === 'history' ? (
                <PurchaseHistory /> // Рендерим историю покупок
              ) : (
                <PersonalData /> // Рендерим персональные данные
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PersonalAccountPage;