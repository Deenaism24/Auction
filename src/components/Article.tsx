// src/components/Article.tsx
import React from 'react';
import * as styles from './Article.module.css';
import { ArticleType } from '../articlesList'; // Убедитесь, что путь правильный

interface ArticleProps {
  article: ArticleType | undefined; // Проп может быть undefined, если статья не найдена
}

const Article: React.FC<ArticleProps> = ({ article }) => {
  if (!article) {
    return <div className={styles.notFound}>Статья не найдена</div>;
  }

  // Если content содержит HTML, используем dangerouslySetInnerHTML.
  // Будьте осторожны с этим, убедитесь, что контент статей безопасен (не содержит вредоносный HTML/скрипты).
  // Если контент - это просто текст или массив параграфов, используйте другой подход.
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
      </div>

      <div className={styles.articleMeta}>
        Дата публикации: {article.date}
      </div>

      {/* Изображение статьи, отображаем только если оно есть */}
      {article.image && (
        <img src={article.image} alt={article.title} className={styles.articleImage} />
      )}

      {/* Содержимое статьи */}
      {renderContent()}

      {/* Если content не HTML, а просто текст, используйте так: */}
      {/* <div className={styles.articleContent}>{article.content}</div> */}

      {/* Если content - массив параграфов: */}
      {/* {Array.isArray(article.content) && (
          <div className={styles.articleContent}>
              {article.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
              ))}
          </div>
      )} */}

    </article>
  );
};

export default Article;