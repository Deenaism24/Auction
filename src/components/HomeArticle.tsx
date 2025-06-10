// src/components/HomeArticle.tsx
import React from 'react';
import * as styles from './HomeArticle.module.css';
import ArticleIcon from '../icons/article.svg';
import { routes } from '../routes';
import articles, { ArticleType } from '../articlesList'; // Убедитесь, что ArticleType правильно импортируется, если articlesList экспортирует только массив

// Если ArticleType не экспортируется из articlesList, определите его здесь:
// interface ArticleType {
//   id: string;
//   title: string;
//   author?: string;
//   date?: string;
//   quote: string;
//   quoteAuthor: string;
//   content: string;
//   image?: string;
// }

import { generatePath, NavLink } from 'react-router-dom';

const HomeArticle: React.FC = () => {
  // На главной странице отображаем первую статью из списка (или другую логику выбора)
  // Убедитесь, что articles не пуст перед доступом к articles[0]
  const articleToShow: ArticleType | undefined = articles.length > 0 ? articles[0] : undefined;


  // !!! ИСПРАВЛЕНО: ИСПОЛЬЗУЕМ ИМЯ ПАРАМЕТРА 'id' !!!
  const articlePath = articleToShow ? generatePath(routes.article, { id: articleToShow.id }) : '#'; // Используем 'id'
  // !!! КОНЕЦ ИСПРАВЛЕНИЯ !!!


  if (!articleToShow) {
    // Если нет статей для отображения, можно вернуть null или другое сообщение
    return (
      <article className={ styles.article }>
        <div className={ styles.articleContent }>
          <div className={ styles.articleHeader }>
            <img src={ArticleIcon} alt="Статья" className={ styles.articleIcon }/>
            <div className={ styles.articleTitle }>Статья</div>
          </div>
          <div className={ styles.quote }>
            Нет доступных статей для отображения.
          </div>
        </div>
      </article>
    );
  }


  return (
    <article className={ styles.article }>
      {/* Отображаем изображение конкретной статьи */}
      {articleToShow.image && (
        <img
          src={articleToShow.image}
          alt={`Иллюстрация к статье "${articleToShow.title}"`} // Более осмысленный alt-текст
          className={ styles.articleImage}
        />
      )}

      <div className={ styles.articleContent }>
        <div className={ styles.articleHeader }>
          <img src={ArticleIcon} alt="Статья" className={ styles.articleIcon }/>
          {/* Заголовок берется из данных статьи */}
          <div className={ styles.articleTitle }>Статья</div> {/* Или articleToShow.title, если здесь должен быть именно заголовок статьи */}
        </div>
        {/* Цитата берется из данных статьи */}
        {articleToShow.quote && (
          <div className={ styles.quote }>
            "{articleToShow.quote}" {/* Добавим кавычки, если они не часть текста цитаты */}
            {/* Автор цитаты, если есть */}
            {articleToShow.quoteAuthor && <p>– {articleToShow.quoteAuthor}</p>}
          </div>
        )}

        <NavLink to={articlePath} className={ styles.readButton }>
          Ознакомиться
        </NavLink>

      </div>
    </article>
  );
};

export default HomeArticle;