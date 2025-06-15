import React from 'react'; // Импорт библиотеки React
import * as styles from './style.module.css';

// Интерфейс пропсов для компонента PhotoPopup
interface PhotoPopupProps {
  imageUrl: string; // URL изображения, которое нужно отобразить
  onClose: () => void; // Функция, вызываемая при запросе закрытия попапа
}

// Компонент попапа для увеличения и отображения фото на весь экран
const PhotoPopup: React.FC<PhotoPopupProps> = ({ imageUrl, onClose }) => {
  // Рендеринг попапа с изображением
  return (
    // Главный контейнер попапа. Позиционирован фиксированно на весь экран, затемняет фон.
    // Клик по любой части этого контейнера (включая изображение) вызывает функцию onClose.
    <div className={ styles.imagePopup } onClick={onClose}>
      {/* Элемент изображения. Отображает переданное изображение. */}
      <img
        src={imageUrl} // Путь к изображению из пропсов
        alt=""
        className={ styles.popupImage } // Класс стилей для изображения
      />
    </div>
  );
};

export default PhotoPopup;