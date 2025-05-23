import React, { useState } from 'react';
import * as styles from './style.module.css';
import closeIcon from '../icons/close.svg';

interface AddCardProps {
  onClose: () => void;
  onSuccess: () => void;
}

const AddCard: React.FC<AddCardProps> = ({ onClose, onSuccess }) => {
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add card saving logic
    onSuccess();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className={styles.popup}>
      <img src={closeIcon} onClick={onClose} alt='Close' className={styles.closeIcon} />
      <h2 className={styles.title}>ДОБАВЛЕНИЕ КАРТЫ</h2>
      <p className={styles.description}>
        Введите данные карты для добавления ее в систему
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="number"
          placeholder="Номер карты"
          value={cardData.number}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Фамилия имя как на карте"
          value={cardData.name}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          type="text"
          name="expiry"
          placeholder="Срок действия карты"
          value={cardData.expiry}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          type="text"
          name="cvv"
          placeholder="CVV код"
          value={cardData.cvv}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <button type="submit" className={`${styles.button} ${styles.primaryButton}`}>
          Добавить карту
        </button>
      </form>
    </div>
  );
};

export default AddCard;