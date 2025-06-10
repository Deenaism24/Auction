// src/pages/article/index.tsx
import React, { useRef, useEffect, useState } from 'react'; // Добавляем useState
import Header from '../../widgets/header';
import Footer from '../../widgets/footer';
import Article from '../../components/Article'; // Импортируем компонент статьи
import articlesList from '../../articlesList'; // Импортируем список статей (путь может отличаться)
import { useParams } from 'react-router-dom'; // Импортируем useParams для получения ID из URL
import NavigateHeader from '../../components/NavigateHeader';


// Определяем тип статьи (если есть в другом файле)
interface ArticleType {
  id: string;
  title: string;
  author?: string;
  date?: string;
  quote: string;
  quoteAuthor: string;
  content: string;
  image?: string;
}


const ArticlePage: React.FC = () => {
  // Получаем параметр 'id' из URL
  const { id } = useParams<{ id: string }>();

  // Состояние для хранения найденной статьи
  const [article, setArticle] = useState<ArticleType | undefined>(undefined);

  // Ищем статью при изменении ID в URL
  useEffect(() => {
    if (id) {
      // Находим статью по ID в нашем списке
      const foundArticle = articlesList.find(art => art.id === id);
      setArticle(foundArticle); // Обновляем состояние статьи
    } else {
      setArticle(undefined); // Или null, в зависимости от вашей логики Article компонента
    }
    // Эффект зависит от ID в URL
  }, [id]);

  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="pageLayout">
      {/* Передаем реф в Header */}
      <Header searchInputRef={searchInputRef} />
      <main className="main">
        {/* NavigateHeader может быть опционален или адаптирован для страницы статьи */}
        {/* Например, он может показывать "Главная > Статьи > [Название статьи]" */}
        <NavigateHeader />
        <div className="container"> {/* Используйте ваш основной контейнер для контента страницы */}
          {/* Рендерим компонент Article, передавая ему найденную статью */}
          {/* Сообщение "Статья не найдена" отобразится внутри Article, если article === undefined */}
          <Article article={article} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ArticlePage;