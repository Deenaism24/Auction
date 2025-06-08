// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './slices/favoritesSlice';
import filterSortReducer from './slices/filterSortSlice'; // <--- Импортируем новый редьюсер

// Настройка хранилища
const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    filterSort: filterSortReducer, // <--- Добавляем новый редьюсер
  },
  // devTools: process.env.NODE_ENV !== 'production',
});

// Определяем типы для RootState и AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Экспортируем хранилище
export default store;