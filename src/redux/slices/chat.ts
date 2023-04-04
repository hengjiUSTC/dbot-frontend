import { createSlice, Dispatch } from '@reduxjs/toolkit';
// utils
import { IBotChatState } from '../../types/bot';
import { instance } from '@/network/axiosInstance';

// ----------------------------------------------------------------------

const initialState: IBotChatState = {
  bot: null,
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: 'chat',
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
    getBotSuccess(state, action) {
      state.isLoading = false;
      state.bot = action.payload;
    },

    // Clear
    clearBot: () => initialState,
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { clearBot } = slice.actions;
// ----------------------------------------------------------------------

export function getBotInfo(id: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await instance.get(`/bot/single/?id=${id}`);
      const obj = JSON.parse(response.data.data);
      dispatch(slice.actions.getBotSuccess(obj));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
