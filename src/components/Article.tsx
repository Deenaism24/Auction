import React from 'react';
import './Article.css';
import ArticleIcon from '../icons/article.svg';
import ArticleImage from '../images/img5.png';
import { NavLink } from 'react-router';
import { routes } from '../routes';

const Article: React.FC = () => {
  return (
    <article className='article'>
      <img
        src={ArticleImage}
        alt="Иллюстрация к статье"
        className='articleImage'
      />
      <div className='articleContent'>
        <div className='articleHeader'>
          <img src={ArticleIcon} alt="Статья" className='articleIcon' />
          <div className='articleTitle'>Статья</div>
        </div>
        <div className='quote'>
          «В нашей жизни есть один цвет, как на палитре художника, который дает смысл жизни и
          искусства. Это цвет любви»
          <p>– Марк Шагал</p>
        </div>
        <a href={routes.article} className='readButton'>
          Ознакомиться
        </a>
      </div>
    </article>
  );
};

export default Article;