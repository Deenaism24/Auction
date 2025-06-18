// src/store/index.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit'; // Импортируем combineReducers
// ИМПОРТИРУЕМ ИЗ REDUX-PERSIST для автоматического сохранения состояний в local storage браузера
import {
  // внутренние сигналы (Actions), которые Redux Persist использует сам для себя
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // По умолчанию Local Storage

import favoritesReducer from './slices/favoritesSlice';
import filterSortReducer from './slices/filterSortSlice';
import userReducer from './slices/userSlice';

// !!! НАСТРОЙКИ PERSISTENCE !!!
const persistConfig = {
  key: 'root', // Ключ для Local Storage (может быть любым уникальным именем вашего приложения)
  storage, // Используем Local Storage
  // blacklist: ['someOtherReducer'], // Список редьюсеров, которые НЕ нужно сохранять
  // Включаем все редьюсеры по умолчанию, если не указан whitelist/blacklist
  whitelist: ['user', 'favorites', 'filterSort'], // Список редьюсеров, которые нужно сохранять
};

// Объединяем все редьюсеры
const rootReducer = combineReducers({
  favorites: favoritesReducer,
  filterSort: filterSortReducer,
  user: userReducer,
});

// СОЗДАЕМ PERSISTED РЕДЬЮСЕР
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Настройка хранилища с помощью configureStore
const store = configureStore({
  // ИСПОЛЬЗУЕМ PERSISTED РЕДЬЮСЕР
  reducer: persistedReducer,
  // middleware по умолчанию включает проверку на несериализуемые экшены
  // Добавляем middleware из redux-persist, чтобы игнорировать экшены, используемые persist
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// СОЗДАЕМ PERSISTOR
const persistor = persistStore(store);

// Определяем типы для RootState и AppDispatch (они основаны на rootReducer)
export type RootState = ReturnType<typeof rootReducer>; // Тип основан на rootReducer
export type AppDispatch = typeof store.dispatch;

export default store;
export { persistor };