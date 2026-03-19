import { createSlice } from '@reduxjs/toolkit';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  autoClose: boolean;
}

interface ToastState {
  items: Toast[];
}

const initialState: ToastState = { items: [] };

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToast(
      state,
      action: {
        payload: { message: string; type: ToastType; autoClose?: boolean };
      }
    ) {
      const { message, type } = action.payload;
      const autoClose = action.payload.autoClose ?? type === 'success';
      state.items.push({
        id: `toast_${Date.now()}_${Math.random().toString(36).slice(2)}`,
        message,
        type,
        autoClose,
      });
    },
    removeToast(state, action: { payload: string }) {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;
