// src/store/index.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit'; // Импортируем combineReducers
// !!! ИМПОРТИРУЕМ ИЗ REDUX-PERSIST !!!
import {
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
// !!! КОНЕЦ ИМПОРТА ИЗ REDUX-PERSIST !!!

import favoritesReducer from './slices/favoritesSlice';
import filterSortReducer from './slices/filterSortSlice';
import userReducer from './slices/userSlice';

// !!! НАСТРОЙКИ PERSISTENCE !!!
const persistConfig = {
  key: 'root', // Ключ для Local Storage (может быть любым уникальным именем вашего приложения)
  storage, // Используем Local Storage
  // whitelist: ['user', 'favorites', 'filterSort'], // Список редьюсеров, которые нужно сохранять
  // blacklist: ['someOtherReducer'], // Список редьюсеров, которые НЕ нужно сохранять
  // Включаем все редьюсеры по умолчанию, если не указан whitelist/blacklist
  // Если вы не хотите сохранять фильтры/сортировку, удалите 'filterSort' из whitelist или добавьте в blacklist
  whitelist: ['user', 'favorites', 'filterSort'], // Явно указываем, что сохраняем
};
// !!! КОНЕЦ НАСТРОЕК PERSISTENCE !!!


// Объединяем все редьюсеры
const rootReducer = combineReducers({
  favorites: favoritesReducer,
  filterSort: filterSortReducer,
  user: userReducer,
  // ... другие редьюсеры
});

// !!! СОЗДАЕМ PERSISTED РЕДЬЮСЕР !!!
const persistedReducer = persistReducer(persistConfig, rootReducer);
// !!! КОНЕЦ СОЗДАНИЯ PERSISTED РЕДЬЮСЕРА !!!


// Настройка хранилища с помощью configureStore
const store = configureStore({
  // !!! ИСПОЛЬЗУЕМ PERSISTED РЕДЬЮСЕР !!!
  reducer: persistedReducer,
  // !!! КОНЕЦ ИСПОЛЬЗОВАНИЯ !!!
  // middleware по умолчанию включает проверку на несериализуемые экшены
  // Добавляем middleware из redux-persist, чтобы игнорировать экшены, используемые persist
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  // devTools: process.env.NODE_ENV !== 'production', // Опционально
});

// !!! СОЗДАЕМ PERSISTOR !!!
const persistor = persistStore(store);
// !!! КОНЕЦ СОЗДАНИЯ PERSISTOR !!!


// Определяем типы для RootState и AppDispatch (они теперь основаны на rootReducer, а не persistedReducer)
// type RootState = ReturnType<typeof store.getState>; // Этот тип теперь основан на persistedReducer
export type RootState = ReturnType<typeof rootReducer>; // Лучше базировать тип на rootReducer
export type AppDispatch = typeof store.dispatch;


// Экспортируем хранилище И персистор
export default store;
export { persistor };