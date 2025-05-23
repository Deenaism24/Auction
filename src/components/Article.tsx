import React from 'react';
import * as styles from './Article.module.css';
import ArticleIcon from '../icons/article.svg';
import ArticleImage from '../images/img5.png';
import { routes } from '../routes';

const Article: React.FC = () => {
  return (
    <article className={ styles.article }>
      <img
        src={ArticleImage}
        alt="Иллюстрация к статье"
        className={ styles.articleImage}
      />
      <div className={ styles.articleContent }>
        <div className={ styles.articleHeader }>
          <img src={ArticleIcon} alt="Статья" className={ styles.articleIcon }/>
          <div className={ styles.articleTitle }>Статья</div>
        </div>
        <div className={ styles.quote }>
          «В нашей жизни есть один цвет, как на палитре художника, который дает смысл жизни и
          искусства. Это цвет любви»
          <p>– Марк Шагал</p>
        </div>
        <a href={routes.article} className={ styles.readButton }>
          Ознакомиться
        </a>
      </div>
    </article>
  );
};

export default Article;