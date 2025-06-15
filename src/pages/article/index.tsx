// src/pages/article/index.tsx
import React, { useRef, useEffect, useState } from 'react'; // Импорт хуков React
import Header from '../../widgets/header';
import Footer from '../../widgets/footer';
import Article from '../../components/Article';
import articlesList from '../../articlesList'; // Импорт списка всех статей
import { useParams } from 'react-router-dom'; // Хук для получения параметров из URL

// Определяем тип статьи (должен соответствовать типу данных в articlesList)
interface ArticleType {
  id: string; // Уникальный идентификатор статьи (используется в URL)
  title: string; // Заголовок статьи
  author?: string; // Автор (опционально)
  date?: string; // Дата публикации (опционально)
  quote: string; // Цитата (для превью на главной)
  quoteAuthor: string; // Автор цитаты
  content: string; // HTML-содержимое статьи
  image?: string; // Изображение статьи (опционально)
}


// Компонент страницы статьи
const ArticlePage: React.FC = () => {
  // Получаем параметр 'id' из текущего URL
  const { id } = useParams<{ id: string }>();

  // Состояние для хранения объекта статьи, найденной по ID
  const [article, setArticle] = useState<ArticleType | undefined>(undefined);

  // Эффект, который выполняется при изменении 'id' в URL
  useEffect(() => {
    if (id) {
      // Ищем статью в импортированном списке по полученному ID
      const foundArticle = articlesList.find(art => art.id === id);
      setArticle(foundArticle); // Обновляем состояние найденной статьей
    } else {
      // Если ID в URL отсутствует, сбрасываем состояние статьи
      setArticle(undefined);
    }
    // Эффект перезапускается при каждом изменении 'id' в параметрах URL
  }, [id]); // Зависимость эффекта от параметра 'id'

  // Реф для поля поиска в хедере (даже если поиск на этой странице не активен, хедер его требует)
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Рендеринг страницы
  return (
    <div className="pageLayout"> {/* Основной контейнер макета страницы */}
      {/* Отображаем хедер, передавая реф для поиска */}
      <Header searchInputRef={searchInputRef} />
      <main className="main"> {/* Основная область контента */}
        <div className="container"> {/* Контейнер для центрирования контента */}
          {/* Рендерим компонент Article, передавая ему найденную статью */}
          {/* Логика отображения "Статья не найдена" находится внутри компонента Article */}
          <Article article={article} />
        </div>
      </main>
      {/* Отображаем футер */}
      <Footer />
    </div>
  );
};

export default ArticlePage;