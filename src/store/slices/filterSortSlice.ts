// src/store/slices/filterSortSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import lotsData from '../../lotsList'; // Импортируем исходный список лотов

// Определяем тип лота (если у вас есть отдельный файл с типами, используйте его)
interface Lot {
  id: number;
  number: string | number;
  title: string;
  price: string;
  city: string | undefined;
  event: string | undefined;
  category: string | undefined;
  image: string;
  // ... другие поля
}

// Определяем тип состояния
interface FilterSortState {
  allLots: Lot[]; // Храним исходные данные лотов
  selectedLocations: string[];
  selectedEvents: string[];
  selectedCategories: string[];
  selectedSort: string; // Например, 'title-asc', 'price-desc' и т.д.
  searchTerm: string; // !!! ВЕРНУЛИ SEARCHTERM !!!
}

// Начальное состояние
const initialState: FilterSortState = {
  allLots: lotsData as Lot[], // Загружаем исходные данные при старте
  selectedLocations: [],
  selectedEvents: [],
  selectedCategories: [],
  selectedSort: 'title-asc', // Начальная сортировка по умолчанию
  searchTerm: '', // !!! НАЧАЛЬНОЕ ЗНАЧЕНИЕ SEARCHTERM !!!
};

// Создаем срез состояния
const filterSortSlice = createSlice({
  name: 'filterSort',
  initialState,
  reducers: {
    // Общий редьюсер для установки фильтров (например, для очистки)
    setFilters: (state, action: PayloadAction<{
      locations?: string[];
      events?: string[];
      categories?: string[];
    }>) => {
      if (action.payload.locations !== undefined) {
        state.selectedLocations = action.payload.locations;
      }
      if (action.payload.events !== undefined) {
        state.selectedEvents = action.payload.events;
      }
      if (action.payload.categories !== undefined) {
        state.selectedCategories = action.payload.categories;
      }
      // Не нужны сравнения с []
    },
    // Редьюсеры для переключения фильтров (оставляем как есть)
    toggleLocationFilter: (state, action: PayloadAction<string>) => {
      const location = action.payload;
      if (state.selectedLocations.includes(location)) {
        state.selectedLocations = state.selectedLocations.filter(loc => loc !== location);
      } else {
        state.selectedLocations.push(location);
      }
    },
    toggleEventFilter: (state, action: PayloadAction<string>) => {
      const event = action.payload;
      if (state.selectedEvents.includes(event)) {
        state.selectedEvents = state.selectedEvents.filter(ev => ev !== event);
      } else {
        state.selectedEvents.push(event);
      }
    },
    toggleCategoryFilter: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      if (state.selectedCategories.includes(category)) {
        state.selectedCategories = state.selectedCategories.filter(cat => cat !== category);
      } else {
        state.selectedCategories.push(category);
      }
    },
    // Редьюсер для установки опции сортировки (оставляем как есть)
    setSortOption: (state, action: PayloadAction<string>) => {
      state.selectedSort = action.payload;
    },
    // !!! ВЕРНУЛИ РЕДЬЮСЕР ДЛЯ SEARCHTERM !!!
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    // !!! КОНЕЦ РЕДЬЮСЕРА ДЛЯ SEARCHTERM !!!
  },
});

// Экспортируем экшены (добавляем setSearchTerm)
export const {
  setFilters,
  toggleLocationFilter,
  toggleEventFilter,
  toggleCategoryFilter,
  setSortOption,
  setSearchTerm, // !!! ЭКСПОРТИРОВАНО !!!
} = filterSortSlice.actions;

// Экспортируем редьюсер (оставляем как есть)
export default filterSortSlice.reducer;