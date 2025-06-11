// src/store/slices/userSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  isAuthenticated: boolean;
}

const initialState: UserState = {
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setAuthenticated } = userSlice.actions;
export default userSlice.reducer;