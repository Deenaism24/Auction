// src/components/HomeArticle.tsx
import React from 'react';
import * as styles from './HomeArticle.module.css';
import ArticleIcon from '../icons/article.svg';
import { routes } from '../routes'; // Импорт определений маршрутов
import articles, { ArticleType } from '../articlesList'; // Импорт списка статей и их типа

import { generatePath, NavLink } from 'react-router-dom'; // Импорт утилит для маршрутизации

// Функциональный компонент для отображения краткой информации о статье на главной странице
const HomeArticle: React.FC = () => {
  // Выбираем первую статью из списка для отображения (или undefined, если список пуст)
  const articleToShow: ArticleType | undefined = articles.length > 0 ? articles[0] : undefined;
  // Генерируем путь к полной статье, используя маршрут и ID статьи
  const articlePath = articleToShow ? generatePath(routes.article, { id: articleToShow.id }) : '#';

  // Если статей нет, отображаем сообщение об этом
  if (!articleToShow) {
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

  // JSX для отображения краткой информации о статье
  return (
    <article className={ styles.article }> {/* Контейнер для статьи */}
      {/* Условно рендерим изображение статьи, если оно есть */}
      {articleToShow.image && (
        <img
          src={articleToShow.image}
          alt={`Иллюстрация к статье "${articleToShow.title}"`} // Alt-текст для изображения
          className={ styles.articleImage} // Стили изображения
        />
      )}

      <div className={ styles.articleContent }> {/* Блок контента статьи (текст и кнопка) */}
        <div className={ styles.articleHeader }> {/* Заголовок блока (метка "Статья") */}
          <img src={ArticleIcon} alt="Статья" className={ styles.articleIcon }/> {/* Иконка статьи */}
          <div className={ styles.articleTitle }>Статья</div> {/* Текст метки */}
        </div>
        {/* Условно рендерим цитату, если она есть */}
        {articleToShow.quote && (
          <div className={ styles.quote }> {/* Блок цитаты */}
            "{articleToShow.quote}" {/* Текст цитаты */}
            {/* Условно рендерим автора цитаты, если он есть */}
            {articleToShow.quoteAuthor && <p>– {articleToShow.quoteAuthor}</p>}
          </div>
        )}

        {/* Ссылка-кнопка для перехода на полную страницу статьи */}
        <NavLink to={articlePath} className={ styles.readButton }>
          Ознакомиться
        </NavLink>
      </div>
    </article>
  );
};

export default HomeArticle;