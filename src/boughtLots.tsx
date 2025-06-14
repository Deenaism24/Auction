// src/boughtLots.tsx
import Skrik from './images/skrik.png';
import Img5 from './images/img5.png';

// Интерфейс для купленного лота
export interface PurchasedLot {
  id: number; // Уникальный ID лота
  number: string | number; // Номер лота
  title: string; // Название лота
  price: string; // Стоимость, за которую лот был куплен (может отличаться от стартовой)
  image?: string; // Путь к изображению
  purchaseDate: string; // Дата совершения покупки
  city?: string;
  event?: string;
  category?: string;
}

// Пример данных купленных лотов
const boughtLots: PurchasedLot[] = [
  {
    id: 101,
    number: 'A101',
    title: 'Уникальная Ваза XVIII века',
    price: '50 000 RUB',
    image: Skrik, // Путь к изображению лота
    purchaseDate: '01.01.2023',
    city: 'LONDON',
    event: "Sotheby's",
  },
  {
    id: 105,
    number: 'B105',
    title: 'Абстрактная Скульптура',
    price: '12 500 RUB',
    image: Skrik,
    purchaseDate: '15.02.2023',
    city: 'NEW YORK',
    event: "Christie's",
  },
  {
    id: 112,
    number: 'C112',
    title: 'Коллекционная Монета "Золотой Орел"',
    price: '3 200 RUB',
    image: Img5,
    purchaseDate: '20.03.2023',
    city: 'DUBAI',
    category: 'COINS',
  },
];

// Экспортируем массив данных
export default boughtLots;