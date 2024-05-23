import { createSlice } from '@reduxjs/toolkit';

const sliceName = 'app';

const initialState = {
  loading: false,
  error: '',
};

export const appSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setLoadingAction: (state, action) => {
      state.loading = action.payload as boolean;
    },
    setErrorAction: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLoadingAction, setErrorAction } = appSlice.actions;

export default appSlice.reducer;
