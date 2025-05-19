import React from 'react';
import './style.css';

interface DeleteFavoriteProps {
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteFavorite: React.FC<DeleteFavoriteProps> = ({ onClose, onConfirm }) => {
  return (
    <div className='popup'>
      <button className='closeButton' onClick={onClose}>×</button>
      <h2 className='title'>УБРАТЬ ИЗ ИЗБРАННОГО</h2>
      <p className='description'>
        Вы уверены, что хотите убрать выбранную позицию из избранного?
      </p>
      <div className='confirmationButtons'>
        <button onClick={onClose} className='button secondaryButton confirmationButton'>
          Нет
        </button>
        <button onClick={onConfirm} className='button primaryButton confirmationButton'>
          Да
        </button>
      </div>
    </div>
  );
};

export default DeleteFavorite;