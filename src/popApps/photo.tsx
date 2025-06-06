import React from 'react';
import * as styles from './style.module.css';
// import closeIcon from '../icons/close.svg';

interface PhotoPopupProps {
  imageUrl: string;
  onClose: () => void;
}

const PhotoPopup: React.FC<PhotoPopupProps> = ({ imageUrl, onClose }) => {
  return (
    <div className={ styles.imagePopup } onClick={onClose}>
      <img
        src={imageUrl}
        alt=""
        className={ styles.popupImage }
      />
      {/*<img src={closeIcon} onClick={onClose} alt='Close' className={styles.closeIcon} />*/}
    </div>
  );
};

export default PhotoPopup;