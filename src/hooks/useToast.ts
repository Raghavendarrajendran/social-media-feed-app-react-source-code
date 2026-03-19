import { useCallback } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { addToast } from '../store/slices/toastSlice';
import type { ToastType } from '../store/slices/toastSlice';

export function useToast() {
  const dispatch = useAppDispatch();

  const toast = useCallback(
    (message: string, type: ToastType = 'info', autoClose?: boolean) => {
      dispatch(addToast({ message, type, autoClose }));
    },
    [dispatch]
  );

  return {
    success: (msg: string) => toast(msg, 'success', true),
    error: (msg: string) => toast(msg, 'error', false),
    info: (msg: string) => toast(msg, 'info', true),
  };
}
