import React from 'react';
import './HeroBanner.css';
import OpenImage from '../images/title.jpg';

const HeroBanner: React.FC = () => <img src={OpenImage} alt={'Баннер'} className='hero' />;

export default HeroBanner;
