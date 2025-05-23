import React from 'react';
import * as styles from './HeroBanner.module.css';
import OpenImage from '../images/title.jpg';

const HeroBanner: React.FC = () => <img src={OpenImage} alt={'Баннер'} className={ styles.hero } />;

export default HeroBanner;
