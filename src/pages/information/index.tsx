// src/pages/information/index.tsx
import React, { useRef } from 'react'; // Импорт хука useRef
import Header from '../../widgets/header';
import Footer from '../../widgets/footer';
import Information from "../../components/Information"

// Компонент страницы "Информация"
const InformationPage: React.FC = () => {
  // Реф для поля поиска в хедере.
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Рендеринг страницы
  return (
    <div className="pageLayout"> {/* Основной контейнер макета страницы */}
      {/* Область основного контента страницы Информации */}
      <main className="mainContent"> {/* Возможно, этот класс не соответствует другим страницам (`main`) */}
        {/* Отображаем хедер, передавая реф для поиска */}
        <Header searchInputRef={searchInputRef} />
        {/* Отображаем компонент с информационными секциями */}
        <Information />
      </main>

      {/* Отображаем футер */}
      <Footer />
    </div>
  );
};

export default InformationPage;