// src/store/slices/filterSortSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import lotsData from '../../lotsList'; // Ensure this imports your full list of lots data

// !!! IMPORTANT: Ensure the Lot interface is defined and exported here !!!
export interface Lot { // Exporting the interface
  id: number;
  number: string | number;
  title: string;
  price: string; // Assuming price is stored as a string with currency, e.g., "50,000$"
  city: string | undefined;
  event: string | undefined;
  category: string | undefined;
  image: string;
  // Add any other properties present in your lotsList.tsx here
  // description?: string; // Example if you have a description field
}
// !!! END IMPORTANT !!!


// Define the state type
interface FilterSortState {
  allLots: Lot[]; // Stores the full list of lots
  selectedLocations: string[];
  selectedEvents: string[];
  selectedCategories: string[];
  selectedSort: string;
  searchTerm: string;
}

// Initial state
const initialState: FilterSortState = {
  allLots: lotsData as Lot[], // Load the initial data here
  selectedLocations: [],
  selectedEvents: [],
  selectedCategories: [],
  selectedSort: 'title-asc',
  searchTerm: '',
};

// Create the slice
const filterSortSlice = createSlice({
  name: 'filterSort',
  initialState,
  reducers: {
    // Reducers for managing filters and sort (these are already implemented)
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

// Export actions
export const {
  setFilters,
  toggleLocationFilter,
  toggleEventFilter,
  toggleCategoryFilter,
  setSortOption,
  setSearchTerm,
} = filterSortSlice.actions;

// Export the reducer
export default filterSortSlice.reducer;