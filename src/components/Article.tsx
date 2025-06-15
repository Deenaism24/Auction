// src/components/Article.tsx
import React from 'react';
import * as styles from './Article.module.css';
import { ArticleType } from '../articlesList';
import CalendarIcon from '../icons/calendar.svg';

// Определение пропсов компонента: ожидает объект статьи или undefined
interface ArticleProps {
  article: ArticleType | undefined;
}

// Функциональный компонент Article
const Article: React.FC<ArticleProps> = ({ article }) => {
  // Если объект статьи не передан (undefined), отображаем сообщение "Статья не найдена"
  if (!article) {
    return <div className={styles.notFound}>Статья не найдена</div>;
  }

  // Функция для рендеринга HTML-содержимого статьи
  const renderContent = () => {
    // Если у статьи есть содержимое, рендерим его с помощью dangerouslySetInnerHTML
    if (article.content) {
      return <div className={styles.articleContent} dangerouslySetInnerHTML={{ __html: article.content }} />;
    }
    // Иначе возвращаем null (ничего не рендерим)
    return null;
  };

  // Основной JSX компонента, рендерится, если статья найдена
  return (
    <article className={styles.articleContainer}> {/* Контейнер для всей статьи */}
      <div className={styles.articleHeader}> {/* Блок заголовка статьи */}
        <div className={styles.h2}>{article.title}</div> {/* Основной заголовок статьи */}
        <div className={styles.subHeader}> {/* Подзаголовок, содержащий дату */}
          <div className={styles.articleDate}> {/* Блок даты с иконкой и текстом */}
            <img src={CalendarIcon} alt="Дата публикации" /> {/* Иконка календаря */}
            ДАТА ПУБЛИКАЦИИ {/* Текст метки даты */}
          </div>
          <div className={styles.dateRange}>{article.date}</div> {/* Само значение даты */}
        </div>
      </div>
      {/* Условно рендерим изображение, если оно есть у статьи */}
      {article.image && (
        <img src={article.image} alt={article.title} className={styles.articleImage} />
      )}
      {/* Содержимое статьи */}
      {renderContent()}
    </article>
  );
};

export default Article;