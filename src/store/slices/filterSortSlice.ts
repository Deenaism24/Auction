// src/store/slices/filterSortSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Определяем тип состояния для фильтров и сортировки
interface FilterSortState {
  selectedLocations: string[];
  selectedEvents: string[];
  selectedCategories: string[];
  selectedSort: string; // Например, 'name-asc', 'price-desc' и т.д.
  searchTerm: string; // Добавляем поле для поискового запроса
}

// Начальное состояние
const initialState: FilterSortState = {
  selectedLocations: [],
  selectedEvents: [],
  selectedCategories: [],
  selectedSort: 'name-asc', // Начальная сортировка по умолчанию
  searchTerm: '',
};

// Создаем срез состояния с помощью createSlice
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
    },
    // Редьюсер для переключения (добавления/удаления) локации
    toggleLocationFilter: (state, action: PayloadAction<string>) => {
      const location = action.payload;
      if (state.selectedLocations.includes(location)) {
        state.selectedLocations = state.selectedLocations.filter(loc => loc !== location);
      } else {
        state.selectedLocations.push(location);
      }
    },
    // Редьюсер для переключения (добавления/удаления) события
    toggleEventFilter: (state, action: PayloadAction<string>) => {
      const event = action.payload;
      if (state.selectedEvents.includes(event)) {
        state.selectedEvents = state.selectedEvents.filter(ev => ev !== event);
      } else {
        state.selectedEvents.push(event);
      }
    },
    // Редьюсер для переключения (добавления/удаления) категории
    toggleCategoryFilter: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      if (state.selectedCategories.includes(category)) {
        state.selectedCategories = state.selectedCategories.filter(cat => cat !== category);
      } else {
        state.selectedCategories.push(category);
      }
    },
    // Редьюсер для установки опции сортировки
    setSortOption: (state, action: PayloadAction<string>) => {
      state.selectedSort = action.payload;
    },
    // Редьюсер для установки поискового запроса
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

// Экспортируем экшены
export const {
  setFilters,
  toggleLocationFilter,
  toggleEventFilter,
  toggleCategoryFilter,
  setSortOption,
  setSearchTerm,
} = filterSortSlice.actions;

// Экспортируем редьюсер
export default filterSortSlice.reducer;