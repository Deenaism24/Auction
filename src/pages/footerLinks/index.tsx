import React, { useRef } from 'react'; // Импорт хука useRef
import Header from '../../widgets/header';

import FooterLinks from '../../components/FooterLinks';

// Компонент страницы, отображающей ссылки футера
const FooterLinksPage: React.FC = () => {
  // Реф для поля поиска в хедере.
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Рендеринг страницы
  return (
    <div className="pageLayout"> {/* Основной контейнер макета страницы */}
      {/* Отображаем хедер, передавая реф для поиска */}
      <Header searchInputRef={searchInputRef} />

      <main className="main"> {/* Основная область контента */}
        {/* Отображаем компонент со ссылками футера */}
        <FooterLinks />
      </main>

      {/* На этой странице футер отсутствует в разметке, только компонент FooterLinks */}
    </div>
  );
};

export default FooterLinksPage;