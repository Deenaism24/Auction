import React from 'react';
import * as styles from './HeroBanner.module.css';
import OpenImage from '../images/title.jpg';

// Функциональный компонент для отображения главного баннера на главной странице
const HeroBanner: React.FC = () => (
  // Отображаем изображение, используя импортированный путь и стили
  <img src={OpenImage} alt={'Баннер'} className={ styles.hero } />
);

export default HeroBanner;