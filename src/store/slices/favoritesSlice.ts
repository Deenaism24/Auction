// src/store/slices/favoritesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Интерфейс для состояния избранного
interface FavoritesState {
  // Храним только ID лотов, находящихся в избранном
  // Предполагаем, что ID лота - это число.
  // Если у вас другой тип ID (строка, UUID), измените 'number' соответственно.
  items: number[];
}

// Начальное состояние: пустой массив избранных ID
const initialState: FavoritesState = {
  items: [],
};

// Создаем срез состояния с помощью createSlice
const favoritesSlice = createSlice({
  name: 'favorites', // Уникальное имя среза
  initialState,
  reducers: {
    // Добавляем лот в избранное. Payload - это ID лота.
    addFavorite: (state, action: PayloadAction<number>) => {
      const lotId = action.payload;
      // Избегаем дублирования: добавляем ID только если его еще нет в массиве
      if (!state.items.includes(lotId)) {
        state.items.push(lotId); // RTK делает push мутабельным, но под капотом это иммутабельно
      }
    },
    // Удаляем лот из избранного. Payload - это ID лота.
    removeFavorite: (state, action: PayloadAction<number>) => {
      const lotId = action.payload;
      // Фильтруем массив, оставляя только те ID, которые не равны удаляемому
      state.items = state.items.filter(id => id !== lotId);
    },
  },
});

// Экспортируем автоматически сгенерированные экшены
export const { addFavorite, removeFavorite } = favoritesSlice.actions;

// Экспортируем редьюсер
export default favoritesSlice.reducer;