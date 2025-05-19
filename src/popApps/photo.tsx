import React from 'react';
import './style.css';

interface PhotoPopupProps {
  imageUrl: string;
  altText?: string;
  onClose: () => void;
}

const PhotoPopup: React.FC<PhotoPopupProps> = ({ imageUrl, altText = '', onClose }) => {
  return (
    <div className="imagePopup" onClick={onClose}>
      <div className="imageContainer" onClick={(e) => e.stopPropagation()}>
        <img
          src={imageUrl}
          alt={altText}
          className="popupImage"
        />
        <button
          className="imageCloseButton"
          onClick={onClose}
          aria-label="Close image"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default PhotoPopup;