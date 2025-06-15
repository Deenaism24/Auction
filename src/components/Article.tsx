// src/components/Article.tsx
import React from 'react';
import * as styles from './Article.module.css';
import { ArticleType } from '../articlesList';
import CalendarIcon from '../icons/calendar.svg';

interface ArticleProps {
  article: ArticleType | undefined;
}

const Article: React.FC<ArticleProps> = ({ article }) => {
  if (!article) {
    return <div className={styles.notFound}>Статья не найдена</div>;
  }

  const renderContent = () => {
    if (article.content) {
      return <div className={styles.articleContent} dangerouslySetInnerHTML={{ __html: article.content }} />;
    }
    return null;
  };

  return (
    <article className={styles.articleContainer}>
      <div className={styles.articleHeader}>
        <div className={styles.h2}>{article.title}</div>
        <div className={styles.subHeader}>
          <div className={styles.articleDate}>
            <img src={CalendarIcon} alt="Дата публикации" />
            ДАТА ПУБЛИКАЦИИ
          </div>
          <div className={styles.dateRange}>{article.date}</div>
        </div>
      </div>
      {/* Изображение */}
      {article.image && (
        <img src={article.image} alt={article.title} className={styles.articleImage} />
      )}
      {/* Содержимое статьи */}
      {renderContent()}
    </article>
  );
};

export default Article;