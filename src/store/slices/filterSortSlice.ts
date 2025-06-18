// src/store/slices/filterSortSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import lotsData from '../../lotsList';

export interface Lot { // Экспорт интерфейса
  id: number;
  number: string | number;
  title: string;
  price: string;
  city: string | undefined;
  event: string | undefined;
  category: string | undefined;
  image: string;
}

// Определяем тип состояния
interface FilterSortState {
  allLots: Lot[]; // Хранит полный список лотов
  selectedLocations: string[];
  selectedEvents: string[];
  selectedCategories: string[];
  selectedSort: string;
  searchTerm: string;
}

// Начальное состояние
const initialState: FilterSortState = {
  allLots: lotsData as Lot[], // Загружаем начальные данные здесь
  selectedLocations: [],
  selectedEvents: [],
  selectedCategories: [],
  selectedSort: 'title-asc',
  searchTerm: '',
};

// Создаем срез состояния
const filterSortSlice = createSlice({
  name: 'filterSort', // Имя среза
  initialState,
  reducers: {
    // Редьюсеры для управления фильтрами и сортировкой (уже реализованы)
    setFilters: (state, action: PayloadAction<{
      locations?: string[];
      events?: string[];
      categories?: string[];
    }>) => {
      if (action.payload.locations !== undefined) { state.selectedLocations = action.payload.locations; }
      if (action.payload.events !== undefined) { state.selectedEvents = action.payload.events; }
      if (action.payload.categories !== undefined) { state.selectedCategories = action.payload.categories; }
    },
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
    setSortOption: (state, action: PayloadAction<string>) => {
      state.selectedSort = action.payload;
    },
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