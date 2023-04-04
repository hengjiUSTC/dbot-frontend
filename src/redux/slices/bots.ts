import { createSlice, Dispatch } from '@reduxjs/toolkit';
// utils
import { IBotState } from '../../types/bot';
import { instance } from '@/network/axiosInstance';

// ----------------------------------------------------------------------

const initialState: IBotState = {
  isLoading: false,
  error: null,
  bots: [],
};

const slice = createSlice({
  name: 'bots',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PRODUCTS
    getBotsSuccess(state, action) {
      state.isLoading = false;
      state.bots = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getBots() {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await instance.get('/bot/all/');
      const obj = JSON.parse(response.data.data);
      dispatch(slice.actions.getBotsSuccess(obj));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
